<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCommandeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'statut' => 'sometimes|required|string|in:creee,en_attente_paiement,payee,en_preparation,expediee,livree,annulee',
            'methode_paiement' => 'sometimes|required|string|in:carte,paypal,virement,especes',
            'adresse_livraison' => 'sometimes|required|string|max:255',
            'ville_livraison' => 'sometimes|required|string|max:255',
            'code_postal_livraison' => 'sometimes|required|string|max:20',
            'pays_livraison' => 'sometimes|required|string|max:255',
            'notes' => 'nullable|string',
        ];
    }
}
