<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class FactureResource extends JsonResource
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
            'commande' => new CommandeResource($this->whenLoaded('commande')),
            'numero' => $this->numero,
            'date_emission' => $this->date_emission,
            'montant_ht' => $this->montant_ht,
            'montant_tva' => $this->montant_tva,
            'montant_ttc' => $this->montant_ttc,
            'taux_tva' => $this->taux_tva,
            'statut' => $this->statut,
            'notes' => $this->notes,
            'chemin_pdf' => $this->chemin_pdf,
            'url_pdf' => $this->chemin_pdf ? Storage::url($this->chemin_pdf) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
