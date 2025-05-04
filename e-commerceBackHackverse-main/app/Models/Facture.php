<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'commande_id',
        'numero',
        'date_emission',
        'montant_ht',
        'montant_tva',
        'montant_ttc',
        'taux_tva',
        'statut',
        'notes',
        'chemin_pdf',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_emission' => 'datetime',
        'montant_ht' => 'float',
        'montant_tva' => 'float',
        'montant_ttc' => 'float',
        'taux_tva' => 'float',
    ];

    /**
     * Get the commande that owns the facture.
     */
    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    /**
     * Generate a unique invoice number.
     */
    public static function genererNumero()
    {
        $prefix = 'FACT-';
        $date = now()->format('Ymd');
        $random = strtoupper(substr(uniqid(), -5));
        
        return $prefix . $date . '-' . $random;
    }

    /**
     * Calculate the HT amount.
     */
    public static function calculerMontantHT($montantTTC, $tauxTVA)
    {
        return round($montantTTC / (1 + ($tauxTVA / 100)), 2);
    }

    /**
     * Calculate the TVA amount.
     */
    public static function calculerMontantTVA($montantHT, $tauxTVA)
    {
        return round($montantHT * ($tauxTVA / 100), 2);
    }

    /**
     * Mark the invoice as paid.
     */
    public function marquerCommePaye()
    {
        $this->statut = 'payee';
        $this->save();
        
        return $this;
    }

    /**
     * Mark the invoice as cancelled.
     */
    public function marquerCommeAnnulee()
    {
        $this->statut = 'annulee';
        $this->save();
        
        return $this;
    }
}
