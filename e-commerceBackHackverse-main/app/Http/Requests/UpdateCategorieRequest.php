<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateCategorieRequest extends FormRequest
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
            'nom' => 'sometimes|required|string|max:255',
            'parent_id' => [
                'nullable',
                'exists:categories,id',
                function ($attribute, $value, $fail) {
                    if ($value === $this->route('categorie')) {
                        $fail('Une catégorie ne peut pas être sa propre parente.');
                    }
                },
            ],
            'description' => 'nullable|string',
            'slug' => [
                'nullable',
                'string',
                Rule::unique('categories', 'slug')->ignore($this->route('categorie')),
            ],
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
