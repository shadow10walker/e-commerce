<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProduitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'description' => $this->description,
            'prix' => $this->prix,
            'categorie' => new CategorieResource($this->whenLoaded('categorie')),
            'stock' => $this->stock,
            'est_en_stock' => $this->estEnStock(),
            'slug' => $this->slug,
            'est_actif' => $this->est_actif,
            'images' => MediaResource::collection($this->whenLoaded('images')),
            'image_principale' => $this->whenLoaded('images', function () {
                $imagePrincipale = $this->images->where('est_principal', true)->first();
                return $imagePrincipale ? new MediaResource($imagePrincipale) : null;
            }),
            'variantes' => VarianteResource::collection($this->whenLoaded('variantes')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
