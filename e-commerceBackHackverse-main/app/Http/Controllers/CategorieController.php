<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\Models\Categorie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Categorie::class);

        $categories = Categorie::when($request->has('parent_id'), function ($query) use ($request) {
            return $query->where('parent_id', $request->parent_id);
        })
        ->when($request->has('search'), function ($query) use ($request) {
            return $query->where('nom', 'like', '%' . $request->search . '%');
        })
        ->orderBy('nom')
        ->paginate($request->input('per_page', 15));

        return JsonResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategorieRequest $request)
    {
        $this->authorize('create', Categorie::class);

        $categorie = Categorie::create($request->validated());

        return new JsonResource($categorie);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categorie $categorie)
    {
        $this->authorize('view', $categorie);

        return new JsonResource($categorie);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieRequest $request, Categorie $categorie)
    {
        $this->authorize('update', $categorie);

        $categorie->update($request->validated());

        return new JsonResource($categorie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorie $categorie)
    {
        $this->authorize('delete', $categorie);

        // Vérifier si la catégorie a des produits
        if ($categorie->produits()->count() > 0) {
            return new JsonResponse([
                'message' => 'Impossible de supprimer cette catégorie car elle contient des produits.'
            ], 422);
        }

        // Vérifier si la catégorie a des sous-catégories
        if ($categorie->enfants()->count() > 0) {
            return new JsonResponse([
                'message' => 'Impossible de supprimer cette catégorie car elle contient des sous-catégories.'
            ], 422);
        }

        $categorie->delete();

        return new JsonResponse([
            'message' => 'Catégorie supprimée avec succès.'
        ]);
    }
}
