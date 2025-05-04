<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variante extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'produit_id',
        'nom',
        'valeur',
        'prix_supplement',
        'stock',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'prix_supplement' => 'float',
        'stock' => 'integer',
    ];

    /**
     * Get the product that owns the variant.
     */
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}
