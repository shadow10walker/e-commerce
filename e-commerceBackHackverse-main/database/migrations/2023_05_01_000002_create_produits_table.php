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
        Schema::create('produits', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->text('description');
            $table->decimal('prix', 10, 2);
            $table->uuid('categorie_id');
            $table->integer('stock')->default(0);
            $table->string('slug')->unique();
            $table->boolean('est_actif')->default(true);
            $table->timestamps();

            $table->foreign('categorie_id')
                  ->references('id')
                  ->on('categories')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
