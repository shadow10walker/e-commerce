<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategorieResource;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Categorie::when($request->has('parent_id'), function ($query) use ($request) {
            return $query->where('parent_id', $request->parent_id);
        })
        ->when($request->has('search'), function ($query) use ($request) {
            return $query->where('nom', 'like', '%' . $request->search . '%');
        })
        ->orderBy('nom')
        ->get();

        return CategorieResource::collection($categories);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $categorie = Categorie::where('slug', $slug)
                              ->with(['enfants'])
                              ->firstOrFail();

        return new CategorieResource($categorie);
    }

    /**
     * Display the products for the specified category.
     */
    public function produits(string $slug, Request $request)
    {
        $categorie = Categorie::where('slug', $slug)->firstOrFail();
        
        // Rediriger vers le contrôleur de produits avec le paramètre categorie_id
        return app(ProduitResourceController::class)->index(
            $request->merge(['categorie_id' => $categorie->id])
        );
    }
}
