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
        Schema::create('ligne_commandes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('commande_id');
            $table->uuid('produit_id');
            $table->uuid('variante_id')->nullable();
            $table->integer('quantite');
            $table->decimal('prix_unitaire', 10, 2);
            $table->string('nom_produit');
            $table->json('options')->nullable();
            $table->timestamps();

            $table->foreign('commande_id')
                  ->references('id')
                  ->on('commandes')
                  ->onDelete('cascade');

            $table->foreign('produit_id')
                  ->references('id')
                  ->on('produits')
                  ->onDelete('cascade');

            $table->foreign('variante_id')
                  ->references('id')
                  ->on('variantes')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ligne_commandes');
    }
};
