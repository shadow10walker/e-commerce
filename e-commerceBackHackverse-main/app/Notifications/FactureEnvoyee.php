<?php

namespace App\Notifications;

use App\Models\Facture;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Storage;

class FactureEnvoyee extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * La facture.
     *
     * @var \App\Models\Facture
     */
    protected $facture;

    /**
     * Create a new notification instance.
     */
    public function __construct(Facture $facture)
    {
        $this->facture = $facture;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $commande = $this->facture->commande;
        
        return (new MailMessage)
            ->subject('Votre facture n°' . $this->facture->numero)
            ->greeting('Bonjour ' . $notifiable->prenom . ' ' . $notifiable->nom . ',')
            ->line('Veuillez trouver ci-joint votre facture n°' . $this->facture->numero . ' pour votre commande ' . $commande->reference . '.')
            ->line('Montant total : ' . number_format($this->facture->montant_ttc, 2) . ' €')
            ->action('Voir ma commande', url('/commandes/' . $commande->id))
            ->line('Merci pour votre achat!')
            ->attach(Storage::path($this->facture->chemin_pdf), [
                'as' => 'facture-' . $this->facture->numero . '.pdf',
                'mime' => 'application/pdf',
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'facture_id' => $this->facture->id,
            'facture_numero' => $this->facture->numero,
            'commande_id' => $this->facture->commande_id,
            'commande_reference' => $this->facture->commande->reference,
            'montant' => $this->facture->montant_ttc,
        ];
    }
}
