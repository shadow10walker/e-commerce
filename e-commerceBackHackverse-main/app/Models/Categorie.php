<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'parent_id',
        'description',
        'slug',
    ];

    /**
     * Get the parent category.
     */
    public function parent()
    {
        return $this->belongsTo(Categorie::class, 'parent_id');
    }

    /**
     * Get the child categories.
     */
    public function enfants()
    {
        return $this->hasMany(Categorie::class, 'parent_id');
    }

    /**
     * Get the products for the category.
     */
    public function produits()
    {
        return $this->hasMany(Produit::class);
    }

    /**
     * Get all products including those from child categories.
     */
    public function tousLesProduits()
    {
        $produits = $this->produits;
        
        foreach ($this->enfants as $enfant) {
            $produits = $produits->merge($enfant->tousLesProduits());
        }
        
        return $produits;
    }
}
