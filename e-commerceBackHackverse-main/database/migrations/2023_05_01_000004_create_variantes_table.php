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
        Schema::create('variantes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('produit_id');
            $table->string('nom');
            $table->string('valeur');
            $table->decimal('prix_supplement', 10, 2)->default(0);
            $table->integer('stock')->default(0);
            $table->timestamps();

            $table->foreign('produit_id')
                  ->references('id')
                  ->on('produits')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variantes');
    }
};
