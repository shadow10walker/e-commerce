<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePanierItemRequest;
use App\Http\Requests\UpdatePanierItemRequest;
use App\Models\Panier;
use App\Models\PanierItem;
use App\Models\Produit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PanierController extends Controller
{
    /**
     * Display the current user's active panier.
     */
    public function show(Request $request)
    {
        $panier = $this->getPanierActif($request);

        if (!$panier) {
            $panier = $this->creerPanier($request);
        }

        $panier->load(['items.produit', 'items.variante']);

        return new JsonResource($panier);
    }

    /**
     * Add an item to the panier.
     */
    public function ajouterItem(StorePanierItemRequest $request)
    {
        $panier = $this->getPanierActif($request);

        if (!$panier) {
            $panier = $this->creerPanier($request);
        }

        $produit = Produit::findOrFail($request->produit_id);

        // Vérifier si le produit est en stock
        if (!$produit->estEnStock() || $produit->stock < $request->quantite) {
            return new JsonResponse([
                'message' => 'Ce produit n\'est pas disponible en quantité suffisante.'
            ], 422);
        }

        $panier->ajouterProduit(
            $request->produit_id,
            $request->quantite,
            $request->variante_id
        );

        $panier->load(['items.produit', 'items.variante']);

        return new JsonResource($panier);
    }

    /**
     * Update an item in the panier.
     */
    public function mettreAJourItem(UpdatePanierItemRequest $request, PanierItem $item)
    {
        $panier = $this->getPanierActif($request);

        if (!$panier || $item->panier_id !== $panier->id) {
            return new JsonResponse([
                'message' => 'Cet article n\'appartient pas à votre panier.'
            ], 403);
        }

        $produit = $item->produit;

        // Vérifier si le produit est en stock
        if (!$produit->estEnStock() || $produit->stock < $request->quantite) {
            return new JsonResponse([
                'message' => 'Ce produit n\'est pas disponible en quantité suffisante.'
            ], 422);
        }

        $panier->mettreAJourQuantite(
            $item->produit_id,
            $request->quantite,
            $item->variante_id
        );

        $panier->load(['items.produit', 'items.variante']);

        return new JsonResource($panier);
    }

    /**
     * Remove an item from the panier.
     */
    public function supprimerItem(Request $request, PanierItem $item)
    {
        $panier = $this->getPanierActif($request);

        if (!$panier || $item->panier_id !== $panier->id) {
            return new JsonResponse([
                'message' => 'Cet article n\'appartient pas à votre panier.'
            ], 403);
        }

        $item->delete();

        $panier->load(['items.produit', 'items.variante']);

        return new JsonResource($panier);
    }

    /**
     * Clear the panier.
     */
    public function vider(Request $request)
    {
        $panier = $this->getPanierActif($request);

        if (!$panier) {
            return new JsonResponse([
                'message' => 'Votre panier est déjà vide.'
            ]);
        }

        $panier->vider();

        return new JsonResponse([
            'message' => 'Votre panier a été vidé avec succès.'
        ]);
    }

    /**
     * Get the active panier for the current user or session.
     */
    private function getPanierActif(Request $request)
    {
        if (Auth::check()) {
            return Auth::user()->panierActif();
        }

        $sessionId = $request->session()->get('panier_session_id');

        if (!$sessionId) {
            return null;
        }

        return Panier::where('session_id', $sessionId)
                    ->where('status', 'actif')
                    ->first();
    }

    /**
     * Create a new panier for the current user or session.
     */
    private function creerPanier(Request $request)
    {
        $data = [
            'status' => 'actif'
        ];

        if (Auth::check()) {
            $data['user_id'] = Auth::id();
        } else {
            $sessionId = $request->session()->get('panier_session_id');
            
            if (!$sessionId) {
                $sessionId = Str::uuid()->toString();
                $request->session()->put('panier_session_id', $sessionId);
            }
            
            $data['session_id'] = $sessionId;
        }

        return Panier::create($data);
    }
}
