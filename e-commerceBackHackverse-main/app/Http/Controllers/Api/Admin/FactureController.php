<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FactureResource;
use App\Models\Facture;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $factures = Facture::with(['commande.user'])
            ->when($request->has('statut'), function ($query) use ($request) {
                return $query->where('statut', $request->statut);
            })
            ->when($request->has('search'), function ($query) use ($request) {
                return $query->where('numero', 'like', '%' . $request->search . '%')
                    ->orWhereHas('commande', function ($q) use ($request) {
                        $q->where('reference', 'like', '%' . $request->search . '%');
                    })
                    ->orWhereHas('commande.user', function ($q) use ($request) {
                        $q->where('nom', 'like', '%' . $request->search . '%')
                          ->orWhere('prenom', 'like', '%' . $request->search . '%')
                          ->orWhere('email', 'like', '%' . $request->search . '%');
                    });
            })
            ->when($request->has('date_debut'), function ($query) use ($request) {
                return $query->whereDate('date_emission', '>=', $request->date_debut);
            })
            ->when($request->has('date_fin'), function ($query) use ($request) {
                return $query->whereDate('date_emission', '<=', $request->date_fin);
            })
            ->orderBy($request->input('sort_by', 'date_emission'), $request->input('sort_direction', 'desc'))
            ->paginate($request->input('per_page', 15));

        return FactureResource::collection($factures);
    }

    /**
     * Display the specified resource.
     */
    public function show(Facture $facture)
    {
        $facture->load(['commande.user', 'commande.lignes']);
        return new FactureResource($facture);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Facture $facture)
    {
        $validated = $request->validate([
            'statut' => 'sometimes|required|in:emise,payee,annulee',
            'notes' => 'nullable|string',
        ]);

        $facture->update($validated);

        return new FactureResource($facture);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Facture $facture)
    {
        // Vérifier si la facture peut être supprimée
        if ($facture->statut === 'payee') {
            return new JsonResponse([
                'message' => 'Impossible de supprimer une facture payée.'
            ], 422);
        }

        $facture->delete();

        return new JsonResponse([
            'message' => 'Facture supprimée avec succès.'
        ]);
    }
}
