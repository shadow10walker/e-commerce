<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'session_id',
        'status',
    ];

    /**
     * Get the user that owns the panier.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the items for the panier.
     */
    public function items()
    {
        return $this->hasMany(PanierItem::class);
    }

    /**
     * Calculate the total of the panier.
     */
    public function calculerTotal()
    {
        return $this->items->sum(function ($item) {
            return $item->quantite * $item->produit->prix;
        });
    }

    /**
     * Add a product to the panier.
     */
    public function ajouterProduit($produit_id, $quantite = 1, $variante_id = null)
    {
        $item = $this->items()->where('produit_id', $produit_id)
                              ->where('variante_id', $variante_id)
                              ->first();

        if ($item) {
            $item->quantite += $quantite;
            $item->save();
        } else {
            $this->items()->create([
                'produit_id' => $produit_id,
                'variante_id' => $variante_id,
                'quantite' => $quantite,
            ]);
        }

        return $this;
    }

    /**
     * Remove a product from the panier.
     */
    public function retirerProduit($produit_id, $variante_id = null)
    {
        $this->items()->where('produit_id', $produit_id)
                      ->where('variante_id', $variante_id)
                      ->delete();

        return $this;
    }

    /**
     * Update the quantity of a product in the panier.
     */
    public function mettreAJourQuantite($produit_id, $quantite, $variante_id = null)
    {
        $item = $this->items()->where('produit_id', $produit_id)
                              ->where('variante_id', $variante_id)
                              ->first();

        if ($item) {
            if ($quantite <= 0) {
                $item->delete();
            } else {
                $item->quantite = $quantite;
                $item->save();
            }
        }

        return $this;
    }

    /**
     * Clear the panier.
     */
    public function vider()
    {
        $this->items()->delete();
        return $this;
    }
}
