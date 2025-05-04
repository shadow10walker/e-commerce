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
        Schema::create('paiements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('commande_id');
            $table->decimal('montant', 10, 2);
            $table->enum('methode', ['carte', 'paypal', 'virement', 'especes']);
            $table->enum('statut', ['en_attente', 'complete', 'echoue', 'rembourse'])->default('en_attente');
            $table->string('reference_transaction')->nullable();
            $table->json('details')->nullable();
            $table->timestamps();

            $table->foreign('commande_id')
                  ->references('id')
                  ->on('commandes')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
