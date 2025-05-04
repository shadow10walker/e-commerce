<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\Paiement;
use App\Services\StripeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PaiementController extends Controller
{
    protected $stripeService;

    public function __construct(StripeService $stripeService)
    {
        $this->stripeService = $stripeService;
    }

    /**
     * Créer une session de paiement pour une commande
     */
    public function createCheckoutSession(Request $request, Commande $commande): JsonResponse
    {
        // Vérifier que l'utilisateur a le droit de payer cette commande
        if (Auth::id() !== $commande->user_id && !Auth::user()->isAdmin()) {
            return response()->json([
                'message' => 'Vous n\'êtes pas autorisé à payer cette commande.'
            ], 403);
        }

        // Vérifier que la commande est en attente de paiement
        if ($commande->statut !== 'en_attente_paiement') {
            return response()->json([
                'message' => 'Cette commande n\'est pas en attente de paiement.'
            ], 422);
        }

        try {
            $session = $this->stripeService->createCheckoutSession($commande);

            return response()->json([
                'session_id' => $session['id'],
                'checkout_url' => $session['url'],
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la création de la session de paiement: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création de la session de paiement.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Traiter un paiement réussi
     */
    public function handleSuccess(Request $request, Commande $commande): JsonResponse
    {
        $sessionId = $request->query('session_id');

        if (!$sessionId) {
            return response()->json([
                'message' => 'Session ID manquant.'
            ], 400);
        }

        try {
            $paiement = $this->stripeService->handleSuccessfulPayment($sessionId);

            if (!$paiement) {
                return response()->json([
                    'message' => 'Paiement non trouvé ou non complété.'
                ], 404);
            }

            return response()->json([
                'message' => 'Paiement traité avec succès.',
                'commande' => $commande->fresh(),
                'paiement' => $paiement
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors du traitement du paiement: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Une erreur est survenue lors du traitement du paiement.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Traiter un paiement annulé
     */
    public function handleCancel(Request $request, Commande $commande): JsonResponse
    {
        return response()->json([
            'message' => 'Paiement annulé.',
            'commande' => $commande
        ]);
    }

    /**
     * Traiter les webhooks Stripe
     */
    public function handleWebhook(Request $request): JsonResponse
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        if (!$sigHeader) {
            return response()->json([
                'message' => 'Signature Stripe manquante.'
            ], 400);
        }

        $success = $this->stripeService->handleWebhook($payload, $sigHeader);

        if (!$success) {
            return response()->json([
                'message' => 'Erreur lors du traitement du webhook.'
            ], 400);
        }

        return response()->json([
            'message' => 'Webhook traité avec succès.'
        ]);
    }

    /**
     * Rembourser un paiement
     */
    public function refundPayment(Request $request, Paiement $paiement): JsonResponse
    {
        // Vérifier que l'utilisateur a le droit de rembourser ce paiement
        if (!Auth::user()->isAdmin()) {
            return response()->json([
                'message' => 'Vous n\'êtes pas autorisé à rembourser ce paiement.'
            ], 403);
        }

        // Vérifier que le paiement peut être remboursé
        if ($paiement->statut !== 'complete') {
            return response()->json([
                'message' => 'Ce paiement ne peut pas être remboursé.'
            ], 422);
        }

        $montant = $request->input('montant');
        
        // Valider le montant si fourni
        if ($montant !== null) {
            $request->validate([
                'montant' => 'numeric|min:0.01|max:' . $paiement->montant
            ]);
        }

        try {
            $success = $this->stripeService->refundPayment($paiement, $montant);

            if (!$success) {
                return response()->json([
                    'message' => 'Erreur lors du remboursement.'
                ], 500);
            }

            return response()->json([
                'message' => 'Remboursement effectué avec succès.',
                'paiement' => $paiement->fresh()
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors du remboursement: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Une erreur est survenue lors du remboursement.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
