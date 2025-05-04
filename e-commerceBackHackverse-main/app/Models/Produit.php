<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'description',
        'prix',
        'categorie_id',
        'stock',
        'slug',
        'est_actif',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'prix' => 'float',
        'stock' => 'integer',
        'est_actif' => 'boolean',
    ];

    /**
     * Get the category that owns the product.
     */
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    /**
     * Get the images for the product.
     */
    public function images()
    {
        return $this->hasMany(Media::class);
    }

    /**
     * Get the variants for the product.
     */
    public function variantes()
    {
        return $this->hasMany(Variante::class);
    }

    /**
     * Get the panier items for the product.
     */
    public function panierItems()
    {
        return $this->hasMany(PanierItem::class);
    }

    /**
     * Get the commande items for the product.
     */
    public function ligneCommandes()
    {
        return $this->hasMany(LigneCommande::class);
    }

    /**
     * Decrease the stock.
     */
    public function diminuerStock($quantite)
    {
        if ($this->stock >= $quantite) {
            $this->stock -= $quantite;
            $this->save();
            return true;
        }
        return false;
    }

    /**
     * Increase the stock.
     */
    public function augmenterStock($quantite)
    {
        $this->stock += $quantite;
        $this->save();
        return true;
    }

    /**
     * Check if the product is in stock.
     */
    public function estEnStock()
    {
        return $this->stock > 0;
    }
}
