<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PanierItem extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'panier_id',
        'produit_id',
        'variante_id',
        'quantite',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantite' => 'integer',
    ];

    /**
     * Get the panier that owns the item.
     */
    public function panier()
    {
        return $this->belongsTo(Panier::class);
    }

    /**
     * Get the product that owns the item.
     */
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    /**
     * Get the variant that owns the item.
     */
    public function variante()
    {
        return $this->belongsTo(Variante::class);
    }

    /**
     * Calculate the subtotal of the item.
     */
    public function calculerSousTotal()
    {
        $prix = $this->produit->prix;
        
        if ($this->variante) {
            $prix += $this->variante->prix_supplement;
        }
        
        return $prix * $this->quantite;
    }
}
