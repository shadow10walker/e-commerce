<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class Commande extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'panier_id',
        'reference',
        'statut',
        'montant_total',
        'methode_paiement',
        'adresse_livraison',
        'ville_livraison',
        'code_postal_livraison',
        'pays_livraison',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'montant_total' => 'float',
    ];

    /**
     * Get the user that owns the commande.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the panier that owns the commande.
     */
    public function panier()
    {
        return $this->belongsTo(Panier::class);
    }

    /**
     * Get the lignes for the commande.
     */
    public function lignes()
    {
        return $this->hasMany(LigneCommande::class);
    }

    /**
     * Get the paiements for the commande.
     */
    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }

    /**
     * Get the facture for the commande.
     */
    public function facture()
    {
        return $this->hasOne(Facture::class);
    }

    /**
     * Pay the commande.
     */
    public function payer($methode, $montant)
    {
        $this->paiements()->create([
            'montant' => $montant,
            'methode' => $methode,
            'statut' => 'en_attente',
        ]);

        return $this;
    }

    /**
     * Cancel the commande.
     */
    public function annuler()
    {
        $this->statut = 'annulee';
        $this->save();

        // Remettre les produits en stock
        foreach ($this->lignes as $ligne) {
            $ligne->produit->augmenterStock($ligne->quantite);
        }

        // Annuler la facture si elle existe
        if ($this->facture) {
            $this->facture->marquerCommeAnnulee();
        }

        return $this;
    }

    /**
     * Change the status of the commande.
     */
    public function changerStatut($statut)
    {
        $this->statut = $statut;
        $this->save();

        // Si la commande est payée, marquer la facture comme payée
        if ($statut === 'payee' && $this->facture) {
            $this->facture->marquerCommePaye();
        }

        return $this;
    }

    /**
     * Generate a unique reference for the commande.
     */
    public static function genererReference()
    {
        $prefix = 'CMD-';
        $date = now()->format('Ymd');
        $random = strtoupper(substr(uniqid(), -5));
        
        return $prefix . $date . '-' . $random;
    }

    /**
     * Generate an invoice for the commande.
     */
    public function genererFacture($tauxTVA = 20.00)
    {
        // Vérifier si une facture existe déjà
        if ($this->facture) {
            return $this->facture;
        }

        $montantTTC = $this->montant_total;
        $montantHT = Facture::calculerMontantHT($montantTTC, $tauxTVA);
        $montantTVA = Facture::calculerMontantTVA($montantHT, $tauxTVA);

        // Créer la facture
        $facture = Facture::create([
            'commande_id' => $this->id,
            'numero' => Facture::genererNumero(),
            'date_emission' => now(),
            'montant_ht' => $montantHT,
            'montant_tva' => $montantTVA,
            'montant_ttc' => $montantTTC,
            'taux_tva' => $tauxTVA,
            'statut' => $this->statut === 'payee' ? 'payee' : 'emise',
        ]);

        // Générer le PDF de la facture
        $this->genererPDFFacture($facture);

        return $facture;
    }

    /**
     * Generate the PDF for the invoice.
     */
    protected function genererPDFFacture($facture)
    {
        // Charger les données nécessaires
        $facture->load(['commande.user', 'commande.lignes.produit']);
        
        // Générer le PDF
        $pdf = PDF::loadView('factures.template', [
            'facture' => $facture,
            'commande' => $this,
            'client' => $this->user,
            'lignes' => $this->lignes,
        ]);
        
        // Sauvegarder le PDF
        $cheminPDF = 'factures/' . $facture->numero . '.pdf';
        Storage::put($cheminPDF, $pdf->output());
        
        // Mettre à jour le chemin du PDF dans la facture
        $facture->update([
            'chemin_pdf' => $cheminPDF
        ]);

        return $cheminPDF;
    }
}
