<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommandeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'panier_id' => 'required|exists:paniers,id',
            'methode_paiement' => 'required|string|in:carte,paypal,virement,especes',
            'adresse_livraison' => 'required|string|max:255',
            'ville_livraison' => 'required|string|max:255',
            'code_postal_livraison' => 'required|string|max:20',
            'pays_livraison' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ];
    }
}
