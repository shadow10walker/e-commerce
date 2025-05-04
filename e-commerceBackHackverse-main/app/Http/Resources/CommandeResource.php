<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommandeResource extends JsonResource
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
            'user_id' => $this->user_id,
            'user' => new UserResource($this->whenLoaded('user')),
            'panier_id' => $this->panier_id,
            'reference' => $this->reference,
            'statut' => $this->statut,
            'montant_total' => $this->montant_total,
            'methode_paiement' => $this->methode_paiement,
            'adresse_livraison' => $this->adresse_livraison,
            'ville_livraison' => $this->ville_livraison,
            'code_postal_livraison' => $this->code_postal_livraison,
            'pays_livraison' => $this->pays_livraison,
            'notes' => $this->notes,
            'lignes' => LigneCommandeResource::collection($this->whenLoaded('lignes')),
            'paiements' => PaiementResource::collection($this->whenLoaded('paiements')),
            'facture' => new FactureResource($this->whenLoaded('facture')),
            'a_facture' => $this->facture !== null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
