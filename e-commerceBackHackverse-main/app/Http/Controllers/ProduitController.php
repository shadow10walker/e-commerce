<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduitRequest;
use App\Http\Requests\UpdateProduitRequest;
use App\Models\Media;
use App\Models\Produit;
use App\Models\Variante;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Produit::class);

        $produits = Produit::with(['categorie', 'images' => function ($query) {
            $query->where('est_principal', true);
        }])
        ->when($request->has('categorie_id'), function ($query) use ($request) {
            return $query->where('categorie_id', $request->categorie_id);
        })
        ->when($request->has('search'), function ($query) use ($request) {
            return $query->where('nom', 'like', '%' . $request->search . '%')
                         ->orWhere('description', 'like', '%' . $request->search . '%');
        })
        ->when($request->has('min_price'), function ($query) use ($request) {
            return $query->where('prix', '>=', $request->min_price);
        })
        ->when($request->has('max_price'), function ($query) use ($request) {
            return $query->where('prix', '<=', $request->max_price);
        })
        ->when($request->has('en_stock'), function ($query) {
            return $query->where('stock', '>', 0);
        })
        ->orderBy($request->input('sort_by', 'created_at'), $request->input('sort_direction', 'desc'))
        ->paginate($request->input('per_page', 15));

        return JsonResource::collection($produits);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProduitRequest $request)
    {
        $this->authorize('create', Produit::class);

        DB::beginTransaction();

        try {
            // Créer le produit
            $produit = Produit::create($request->safe()->except(['images', 'variantes']));

            // Traiter les images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    $path = $image->store('produits', 'public');
                    
                    Media::create([
                        'produit_id' => $produit->id,
                        'chemin' => $path,
                        'type' => 'image',
                        'ordre' => $index,
                        'est_principal' => $index === 0,
                    ]);
                }
            }

            // Traiter les variantes
            if ($request->has('variantes')) {
                foreach ($request->variantes as $varianteData) {
                    Variante::create([
                        'produit_id' => $produit->id,
                        'nom' => $varianteData['nom'],
                        'valeur' => $varianteData['valeur'],
                        'prix_supplement' => $varianteData['prix_supplement'],
                        'stock' => $varianteData['stock'],
                    ]);
                }
            }

            DB::commit();

            return new JsonResource($produit->load(['categorie', 'images', 'variantes']));
        } catch (\Exception $e) {
            DB::rollBack();
            
            return new JsonResponse([
                'message' => 'Une erreur est survenue lors de la création du produit.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Produit $produit)
    {
        $this->authorize('view', $produit);

        $produit->load(['categorie', 'images', 'variantes']);

        return new JsonResource($produit);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProduitRequest $request, Produit $produit)
    {
        $this->authorize('update', $produit);

        DB::beginTransaction();

        try {
            // Mettre à jour le produit
            $produit->update($request->safe()->except(['images', 'variantes']));

            // Traiter les images
            if ($request->hasFile('images')) {
                // Supprimer les anciennes images
                foreach ($produit->images as $image) {
                    Storage::disk('public')->delete($image->chemin);
                }
                $produit->images()->delete();

                // Ajouter les nouvelles images
                foreach ($request->file('images') as $index => $image) {
                    $path = $image->store('produits', 'public');
                    
                    Media::create([
                        'produit_id' => $produit->id,
                        'chemin' => $path,
                        'type' => 'image',
                        'ordre' => $index,
                        'est_principal' => $index === 0,
                    ]);
                }
            }

            // Traiter les variantes
            if ($request->has('variantes')) {
                // Supprimer les variantes qui ne sont pas dans la requête
                $varianteIds = collect($request->variantes)->pluck('id')->filter()->all();
                $produit->variantes()->whereNotIn('id', $varianteIds)->delete();

                // Mettre à jour ou créer les variantes
                foreach ($request->variantes as $varianteData) {
                    if (isset($varianteData['id'])) {
                        $variante = Variante::find($varianteData['id']);
                        if ($variante) {
                            $variante->update([
                                'nom' => $varianteData['nom'],
                                'valeur' => $varianteData['valeur'],
                                'prix_supplement' => $varianteData['prix_supplement'],
                                'stock' => $varianteData['stock'],
                            ]);
                        }
                    } else {
                        Variante::create([
                            'produit_id' => $produit->id,
                            'nom' => $varianteData['nom'],
                            'valeur' => $varianteData['valeur'],
                            'prix_supplement' => $varianteData['prix_supplement'],
                            'stock' => $varianteData['stock'],
                        ]);
                    }
                }
            }

            DB::commit();

            return new JsonResource($produit->load(['categorie', 'images', 'variantes']));
        } catch (\Exception $e) {
            DB::rollBack();
            
            return new JsonResponse([
                'message' => 'Une erreur est survenue lors de la mise à jour du produit.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produit $produit)
    {
        $this->authorize('delete', $produit);

        DB::beginTransaction();

        try {
            // Supprimer les images
            foreach ($produit->images as $image) {
                Storage::disk('public')->delete($image->chemin);
            }

            // Supprimer le produit (les relations seront supprimées automatiquement grâce aux contraintes de clé étrangère)
            $produit->delete();

            DB::commit();

            return new JsonResponse([
                'message' => 'Produit supprimé avec succès.'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            
            return new JsonResponse([
                'message' => 'Une erreur est survenue lors de la suppression du produit.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
