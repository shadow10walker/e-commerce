<?php

namespace App\Channels;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client as TwilioClient;

class WhatsAppChannel
{
    /**
     * Envoyer la notification via WhatsApp en utilisant Twilio.
     *
     * @param  mixed  $notifiable
     * @param  \Illuminate\Notifications\Notification  $notification
     * @return void
     */
    public function send($notifiable, Notification $notification)
    {
        if (!method_exists($notification, 'toWhatsapp')) {
            return;
        }

        $message = $notification->toWhatsapp($notifiable);

        // Vérifier si le numéro de téléphone est valide
        if (empty($message['to'])) {
            Log::warning('Tentative d\'envoi WhatsApp sans numéro de téléphone valide', [
                'notifiable' => $notifiable->id,
                'notification' => get_class($notification)
            ]);
            return;
        }

        // Formater le numéro de téléphone (supprimer les espaces, ajouter le préfixe international si nécessaire)
        $phoneNumber = $this->formatPhoneNumber($message['to']);

        try {
            // Initialiser le client Twilio
            $twilioClient = new TwilioClient(
                config('services.twilio.sid'),
                config('services.twilio.token')
            );

            // Envoyer le message WhatsApp via Twilio
            $twilioClient->messages->create(
                'whatsapp:' . $phoneNumber, // Format spécifique à Twilio pour WhatsApp
                [
                    'from' => 'whatsapp:' . config('services.twilio.whatsapp_from'),
                    'body' => $message['message']
                ]
            );
        } catch (\Exception $e) {
            Log::error('Exception lors de l\'envoi WhatsApp via Twilio', [
                'exception' => $e->getMessage(),
                'to' => $phoneNumber
            ]);
        }
    }

    /**
     * Formater le numéro de téléphone pour WhatsApp.
     *
     * @param  string  $phoneNumber
     * @return string
     */
    protected function formatPhoneNumber($phoneNumber)
    {
        // Supprimer tous les caractères non numériques
        $phoneNumber = preg_replace('/[^0-9]/', '', $phoneNumber);

        // Ajouter le préfixe international si nécessaire (exemple pour la France)
        if (strlen($phoneNumber) === 10 && substr($phoneNumber, 0, 1) === '0') {
            $phoneNumber = '33' . substr($phoneNumber, 1);
        }

        return $phoneNumber;
    }
}
