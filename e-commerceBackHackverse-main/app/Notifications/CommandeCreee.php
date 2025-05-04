<?php

namespace App\Notifications;

use App\Models\Commande;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommandeCreee extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * La commande.
     *
     * @var \App\Models\Commande
     */
    protected $commande;

    /**
     * Create a new notification instance.
     */
    public function __construct(Commande $commande)
    {
        $this->commande = $commande;
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
        return (new MailMessage)
            ->subject('Votre commande #' . $this->commande->reference . ' a été créée')
            ->greeting('Bonjour ' . $notifiable->prenom . ' ' . $notifiable->nom . ',')
            ->line('Nous avons bien reçu votre commande #' . $this->commande->reference . '.')
            ->line('Montant total : ' . number_format($this->commande->montant_total, 2) . ' €')
            ->action('Voir ma commande', url('/commandes/' . $this->commande->id))
            ->line('Merci pour votre achat!');
    }

    /**
     * Get the WhatsApp representation of the notification.
     */
    public function toWhatsapp(object $notifiable)
    {
        return [
            'to' => $notifiable->telephone,
            'message' => "Bonjour {$notifiable->prenom} {$notifiable->nom},\n\n" .
                "Nous avons bien reçu votre commande #{$this->commande->reference}.\n" .
                "Montant total : " . number_format($this->commande->montant_total, 2) . " €\n\n" .
                "Merci pour votre achat!"
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
            'montant' => $this->commande->montant_total,
            'statut' => $this->commande->statut,
        ];
    }
}
