<?php

namespace App\Notifications;

use App\Models\Commande;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StatutCommandeModifie extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * La commande.
     *
     * @var \App\Models\Commande
     */
    protected $commande;

    /**
     * L'ancien statut.
     *
     * @var string
     */
    protected $ancienStatut;

    /**
     * Create a new notification instance.
     */
    public function __construct(Commande $commande, string $ancienStatut)
    {
        $this->commande = $commande;
        $this->ancienStatut = $ancienStatut;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database', 'whatsapp'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $statutFrancais = $this->traduireStatut($this->commande->statut);
        
        return (new MailMessage)
            ->subject('Mise à jour de votre commande #' . $this->commande->reference)
            ->greeting('Bonjour ' . $notifiable->prenom . ' ' . $notifiable->nom . ',')
            ->line('Le statut de votre commande #' . $this->commande->reference . ' a été mis à jour.')
            ->line('Nouveau statut : ' . $statutFrancais)
            ->action('Voir ma commande', url('/commandes/' . $this->commande->id))
            ->line('Merci de votre confiance!');
    }

    /**
     * Get the WhatsApp representation of the notification.
     */
    public function toWhatsapp(object $notifiable)
    {
        $statutFrancais = $this->traduireStatut($this->commande->statut);
        
        return [
            'to' => $notifiable->telephone,
            'message' => "Bonjour {$notifiable->prenom} {$notifiable->nom},\n\n" .
                "Le statut de votre commande #{$this->commande->reference} a été mis à jour.\n" .
                "Nouveau statut : {$statutFrancais}\n\n" .
                "Merci de votre confiance!"
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'commande_id' => $this->commande->id,
            'reference' => $this->commande->reference,
            'ancien_statut' => $this->ancienStatut,
            'nouveau_statut' => $this->commande->statut,
        ];
    }

    /**
     * Traduire le statut en français.
     */
    protected function traduireStatut(string $statut): string
    {
        $traductions = [
            'creee' => 'Créée',
            'en_attente_paiement' => 'En attente de paiement',
            'payee' => 'Payée',
            'en_preparation' => 'En préparation',
            'expediee' => 'Expédiée',
            'livree' => 'Livrée',
            'annulee' => 'Annulée'
        ];

        return $traductions[$statut] ?? $statut;
    }
}
