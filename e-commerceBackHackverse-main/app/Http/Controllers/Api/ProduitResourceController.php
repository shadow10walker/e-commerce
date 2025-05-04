<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProduitResource;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProduitResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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
        ->where('est_actif', true)
        ->orderBy($request->input('sort_by', 'created_at'), $request->input('sort_direction', 'desc'))
        ->paginate($request->input('per_page', 15));

        return ProduitResource::collection($produits);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $produit = Produit::where('slug', $slug)
                          ->where('est_actif', true)
                          ->with(['categorie', 'images', 'variantes'])
                          ->firstOrFail();

        return new ProduitResource($produit);
    }
}
