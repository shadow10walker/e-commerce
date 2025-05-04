<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Facture;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $factures = Facture::with(['commande.user'])
            ->when(!Auth::user()->isAdmin(), function ($query) {
                return $query->whereHas('commande', function ($q) {
                    $q->where('user_id', Auth::id());
                });
            })
            ->when($request->has('statut'), function ($query) use ($request) {
                return $query->where('statut', $request->statut);
            })
            ->when($request->has('search'), function ($query) use ($request) {
                return $query->where('numero', 'like', '%' . $request->search . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 15));

        return JsonResource::collection($factures);
    }

    /**
     * Display the specified resource.
     */
    public function show(Facture $facture)
    {
        // Vérifier que l'utilisateur a le droit de voir cette facture
        if (!Auth::user()->isAdmin() && $facture->commande->user_id !== Auth::id()) {
            return new JsonResponse([
                'message' => 'Vous n\'êtes pas autorisé à voir cette facture.'
            ], 403);
        }

        $facture->load(['commande.user', 'commande.lignes']);

        return new JsonResource($facture);
    }

    /**
     * Generate an invoice for a commande.
     */
    public function generer(Commande $commande, Request $request)
    {
        // Vérifier que l'utilisateur a le droit de générer une facture pour cette commande
        if (!Auth::user()->isAdmin() && $commande->user_id !== Auth::id()) {
            return new JsonResponse([
                'message' => 'Vous n\'êtes pas autorisé à générer une facture pour cette commande.'
            ], 403);
        }

        // Vérifier si une facture existe déjà
        if ($commande->facture) {
            return new JsonResponse([
                'message' => 'Une facture existe déjà pour cette commande.',
                'facture' => new JsonResource($commande->facture)
            ], 422);
        }

        // Générer la facture
        $tauxTVA = $request->input('taux_tva', 20.00);
        $facture = $commande->genererFacture($tauxTVA);

        return new JsonResource($facture);
    }

    /**
     * Download the invoice as PDF.
     */
    public function telecharger(Facture $facture)
    {
        // Vérifier que l'utilisateur a le droit de télécharger cette facture
        if (!Auth::user()->isAdmin() && $facture->commande->user_id !== Auth::id()) {
            return new JsonResponse([
                'message' => 'Vous n\'êtes pas autorisé à télécharger cette facture.'
            ], 403);
        }

        // Vérifier si le PDF existe déjà
        if ($facture->chemin_pdf && Storage::exists($facture->chemin_pdf)) {
            return Storage::download($facture->chemin_pdf, 'facture-' . $facture->numero . '.pdf');
        }

        // Générer le PDF
        $pdf = $this->genererPDF($facture);

        // Sauvegarder le PDF
        $cheminPDF = 'factures/' . $facture->numero . '.pdf';
        Storage::put($cheminPDF, $pdf->output());

        // Mettre à jour le chemin du PDF dans la facture
        $facture->update(['chemin_pdf' => $cheminPDF]);

        // Télécharger le PDF
        return $pdf->download('facture-' . $facture->numero . '.pdf');
    }

    /**
     * Generate the PDF for the invoice.
     */
    protected function genererPDF(Facture $facture)
    {
        $facture->load(['commande.user', 'commande.lignes.produit']);

        $pdf = PDF::loadView('factures.template', [
            'facture' => $facture,
            'commande' => $facture->commande,
            'client' => $facture->commande->user,
            'lignes' => $facture->commande->lignes,
        ]);

        return $pdf;
    }

    /**
     * Send the invoice by email.
     */
    public function envoyer(Facture $facture)
    {
        // Vérifier que l'utilisateur a le droit d'envoyer cette facture
        if (!Auth::user()->isAdmin() && $facture->commande->user_id !== Auth::id()) {
            return new JsonResponse([
                'message' => 'Vous n\'êtes pas autorisé à envoyer cette facture.'
            ], 403);
        }

        // Vérifier si le PDF existe, sinon le générer
        if (!$facture->chemin_pdf || !Storage::exists($facture->chemin_pdf)) {
            $pdf = $this->genererPDF($facture);
            $cheminPDF = 'factures/' . $facture->numero . '.pdf';
            Storage::put($cheminPDF, $pdf->output());
            $facture->update(['chemin_pdf' => $cheminPDF]);
        }

        // Envoyer l'email avec la facture en pièce jointe
        $client = $facture->commande->user;
        $client->notify(new \App\Notifications\FactureEnvoyee($facture));

        return new JsonResponse([
            'message' => 'La facture a été envoyée par email avec succès.'
        ]);
    }
}
