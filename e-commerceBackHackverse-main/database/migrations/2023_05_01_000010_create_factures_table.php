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
        Schema::create('factures', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('commande_id');
            $table->string('numero')->unique();
            $table->timestamp('date_emission');
            $table->decimal('montant_ht', 10, 2);
            $table->decimal('montant_tva', 10, 2);
            $table->decimal('montant_ttc', 10, 2);
            $table->decimal('taux_tva', 5, 2)->default(20.00);
            $table->enum('statut', ['emise', 'payee', 'annulee'])->default('emise');
            $table->text('notes')->nullable();
            $table->string('chemin_pdf')->nullable();
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
        Schema::dropIfExists('factures');
    }
};
