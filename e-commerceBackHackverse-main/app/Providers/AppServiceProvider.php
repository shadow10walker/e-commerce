<?php

namespace App\Providers;

use Illuminate\Database\DBAL\TimestampType;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\DBAL\Types\Type;
use Doctrine\DBAL\Types\Type as DoctrineType;
use Illuminate\Support\Facades\Notification;
use App\Channels\WhatsAppChannel;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Ajouter le support pour les UUID dans les migrations
        if (!DoctrineType::hasType('uuid')) {
            DoctrineType::addType('uuid', 'Ramsey\Uuid\Doctrine\UuidType');
        }

        // Enregistrer le canal WhatsApp
        Notification::extend('whatsapp', function ($app) {
            return new WhatsAppChannel();
        });
    }
}
