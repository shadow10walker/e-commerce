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
        // Étape 1: Créer la table sans la contrainte de clé étrangère
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->uuid('parent_id')->nullable();
            $table->text('description')->nullable();
            $table->string('slug')->unique();
            $table->timestamps();
        });

        // Étape 2: Ajouter la contrainte de clé étrangère après la création de la table
        Schema::table('categories', function (Blueprint $table) {
            $table->foreign('parent_id')
                ->references('id')
                ->on('categories')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Supprimer d'abord la contrainte de clé étrangère
        Schema::table('categories', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
        });

        // Puis supprimer la table
        Schema::dropIfExists('categories');
    }
};
