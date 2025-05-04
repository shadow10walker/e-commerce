<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneCommande extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'commande_id',
        'produit_id',
        'variante_id',
        'quantite',
        'prix_unitaire',
        'nom_produit',
        'options',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantite' => 'integer',
        'prix_unitaire' => 'float',
        'options' => 'array',
    ];

    /**
     * Get the commande that owns the ligne.
     */
    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    /**
     * Get the product that owns the ligne.
     */
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    /**
     * Get the variant that owns the ligne.
     */
    public function variante()
    {
        return $this->belongsTo(Variante::class);
    }

    /**
     * Calculate the subtotal of the ligne.
     */
    public function calculerSousTotal()
    {
        return $this->prix_unitaire * $this->quantite;
    }
}
