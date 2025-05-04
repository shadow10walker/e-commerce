<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VarianteResource extends JsonResource
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
            'produit_id' => $this->produit_id,
            'nom' => $this->nom,
            'valeur' => $this->valeur,
            'prix_supplement' => $this->prix_supplement,
            'stock' => $this->stock,
            'est_en_stock' => $this->stock > 0,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
