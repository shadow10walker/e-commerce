<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommandeRequest;
use App\Http\Requests\UpdateCommandeRequest;
use App\Http\Resources\CommandeResource;
use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Panier;
use App\Notifications\CommandeCreee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $commandes = Commande::with(['user'])
            ->when(!Auth::user()->isAdmin(), function ($query) {
                return $query->where('user_id', Auth::id());
            })
            ->when($request->has('statut'), function ($query) use ($request) {
                return $query->where('statut', $request->statut);
            })
            ->when($request->has('search'), function ($query) use ($request) {
                return $query->where('reference', 'like', '%' . $request->search . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 15));

        return CommandeResource::collection($commandes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommandeRequest $request)
    {
        $this->authorize('create', Commande::class);

        DB::beginTransaction();

        try {
            $panier = Panier::findOrFail($request->panier_id);

            // Vérifier que le panier appartient à l'utilisateur
            if (Auth::id() !== $panier->user_id) {
                return new JsonResponse([
                    'message' => 'Ce panier ne vous appartient pas.'
                ], 403);
            }

            // Vérifier que le panier n'est pas vide
            if ($panier->items->isEmpty()) {
                return new JsonResponse([
                    'message' => 'Votre panier est vide.'
                ], 422);
            }

            // Vérifier la disponibilité des produits
            foreach ($panier->items as $item) {
                $produit = $item->produit;
                
                if (!$produit->estEnStock() || $produit->stock < $item->quantite) {
                    return new JsonResponse([
                        'message' => "Le produit '{$produit->nom}' n'est pas disponible en quantité suffisante."
                    ], 422);
                }
            }

            // Créer la commande
            $commande = Commande::create([
                'user_id' => Auth::id(),
                'panier_id' => $panier->id,
                'reference' => Commande::genererReference(),
                'statut' => 'en_attente_paiement',
                'montant_total' => $panier->calculerTotal(),
                'methode_paiement' => $request->methode_paiement,
                'adresse_livraison' => $request->adresse_livraison,
                'ville_livraison' => $request->ville_livraison,
                'code_postal_livraison' => $request->code_postal_livraison,
                'pays_livraison' => $request->pays_livraison,
                'notes' => $request->notes,
            ]);

            // Créer les lignes de commande
            foreach ($panier->items as $item) {
                LigneCommande::create([
                    'commande_id' => $commande->id,
                    'produit_id' => $item->produit_id,
                    'variante_id' => $item->variante_id,
                    'quantite' => $item->quantite,
                    'prix_unitaire' => $item->produit->prix + ($item->variante ? $item->variante->prix_supplement : 0),
                    'nom_produit' => $item->produit->nom,
                    'options' => $item->variante ? [
                        'nom' => $item->variante->nom,
                        'valeur' => $item->variante->valeur
                    ] : null,
                ]);

                // Diminuer le stock
                $item->produit->diminuerStock($item->quantite);
            }

            // Marquer le panier comme commandé
            $panier->update(['status' => 'commande']);

            DB::commit();

            // Envoyer une notification à l'utilisateur
            Auth::user()->notify(new CommandeCreee($commande));

            return new CommandeResource($commande->load(['lignes', 'user']));
        } catch (\Exception $e) {
            DB::rollBack();
            
            return new JsonResponse([
                'message' => 'Une erreur est survenue lors de la création de la commande.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Commande $commande)
    {
        $this->authorize('view', $commande);

        $commande->load(['lignes.produit', 'lignes.variante', 'user', 'paiements']);

        return new CommandeResource($commande);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommandeRequest $request, Commande $commande)
    {
        $this->authorize('update', $commande);

        $commande->update($request->validated());

        return new CommandeResource($commande);
    }

    /**
     * Cancel the specified commande.
     */
    public function annuler(Commande $commande)
    {
        $this->authorize('cancel', $commande);

        // Vérifier si la commande peut être annulée
        if (!in_array($commande->statut, ['creee', 'en_attente_paiement'])) {
            return new JsonResponse([
                'message' => 'Cette commande ne peut plus être annulée.'
            ], 422);
        }

        $commande->annuler();

        return new JsonResponse([
            'message' => 'Commande annulée avec succès.'
        ]);
    }
}
