<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LigneCommandeResource extends JsonResource
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
            'commande_id' => $this->commande_id,
            'produit_id' => $this->produit_id,
            'produit' => new ProduitResource($this->whenLoaded('produit')),
            'variante_id' => $this->variante_id,
            'variante' => new VarianteResource($this->whenLoaded('variante')),
            'quantite' => $this->quantite,
            'prix_unitaire' => $this->prix_unitaire,
            'nom_produit' => $this->nom_produit,
            'options' => $this->options,
            'sous_total' => $this->calculerSousTotal(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
