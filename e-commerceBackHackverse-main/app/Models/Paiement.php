<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'commande_id',
        'montant',
        'methode',
        'statut',
        'reference_transaction',
        'details',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'montant' => 'float',
        'details' => 'array',
    ];

    /**
     * Get the commande that owns the paiement.
     */
    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    /**
     * Process the paiement.
     */
    public function traiter()
    {
        $this->statut = 'complete';
        $this->save();

        // Mettre à jour le statut de la commande
        $this->commande->changerStatut('payee');

        return $this;
    }

    /**
     * Refund the paiement.
     */
    public function rembourser($montant = null)
    {
        $montantRemboursement = $montant ?? $this->montant;

        // Logique de remboursement selon la méthode de paiement
        // ...

        $this->statut = 'rembourse';
        $this->save();

        return $this;
    }
}
