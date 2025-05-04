<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MediaResource extends JsonResource
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
            'chemin' => $this->chemin,
            'url' => Storage::url($this->chemin),
            'type' => $this->type,
            'ordre' => $this->ordre,
            'est_principal' => $this->est_principal,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
