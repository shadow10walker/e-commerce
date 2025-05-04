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
        Schema::create('panier_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('panier_id');
            $table->uuid('produit_id');
            $table->uuid('variante_id')->nullable();
            $table->integer('quantite')->default(1);
            $table->timestamps();

            $table->foreign('panier_id')
                  ->references('id')
                  ->on('paniers')
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
        Schema::dropIfExists('panier_items');
    }
};
