<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreProduitRequest extends FormRequest
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
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'prix' => 'required|numeric|min:0',
            'categorie_id' => 'required|exists:categories,id',
            'stock' => 'required|integer|min:0',
            'slug' => 'nullable|string|unique:produits,slug',
            'est_actif' => 'boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'variantes' => 'nullable|array',
            'variantes.*.nom' => 'required|string|max:255',
            'variantes.*.valeur' => 'required|string|max:255',
            'variantes.*.prix_supplement' => 'required|numeric|min:0',
            'variantes.*.stock' => 'required|integer|min:0',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if (!$this->has('slug') && $this->has('nom')) {
            $this->merge([
                'slug' => Str::slug($this->nom),
            ]);
        }
    }
}
