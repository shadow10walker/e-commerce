<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'prenom' => $this->prenom,
            'email' => $this->email,
            'role' => $this->role,
            'adresse' => $this->adresse,
            'ville' => $this->ville,
            'code_postal' => $this->code_postal,
            'pays' => $this->pays,
            'telephone' => $this->telephone,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
