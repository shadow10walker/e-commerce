<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('panier_id');
            $table->string('reference')->unique();
            $table->enum('statut', [
                'creee', 
                'en_attente_paiement', 
                'payee', 
                'en_preparation', 
                'expediee', 
                'livree', 
                'annulee'
            ])->default('creee');
            $table->decimal('montant_total', 10, 2);
            $table->string('methode_paiement')->nullable();
            $table->string('adresse_livraison');
            $table->string('ville_livraison');
            $table->string('code_postal_livraison');
            $table->string('pays_livraison');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');

            $table->foreign('panier_id')
                  ->references('id')
                  ->on('paniers')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
