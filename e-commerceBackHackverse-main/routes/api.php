<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategorieResourceController;
use App\Http\Controllers\Api\FactureController;
use App\Http\Controllers\Api\PaiementController;
use App\Http\Controllers\Api\ProduitResourceController;
use App\Http\Controllers\Api\SocialiteController;
use App\Http\Controllers\Api\Admin\FactureController as AdminFactureController;
use App\Http\Controllers\Api\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes d'authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes d'authentification sociale
Route::get('/auth/{provider}', [SocialiteController::class, 'redirectToProvider']);
Route::get('/auth/{provider}/callback', [SocialiteController::class, 'handleProviderCallback']);

// Webhook Stripe (doit être accessible sans authentification)
Route::post('/webhooks/stripe', [PaiementController::class, 'handleWebhook']);

// Routes protégées par authentification
Route::middleware(['auth:sanctum'])->group(function () {
    // Routes d'authentification
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/verify-token', [AuthController::class, 'verifyToken']);

    // Route pour récupérer l'utilisateur connecté
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Routes pour les paniers
    Route::get('/panier', 'App\Http\Controllers\Api\PanierController@show');
    Route::post('/panier/items', 'App\Http\Controllers\Api\PanierController@ajouterItem');
    Route::put('/panier/items/{item}', 'App\Http\Controllers\Api\PanierController@mettreAJourItem');
    Route::delete('/panier/items/{item}', 'App\Http\Controllers\Api\PanierController@supprimerItem');
    Route::delete('/panier', 'App\Http\Controllers\Api\PanierController@vider');

    // Routes pour les commandes
    Route::get('/commandes', 'App\Http\Controllers\Api\CommandeController@index');
    Route::post('/commandes', 'App\Http\Controllers\Api\CommandeController@store');
    Route::get('/commandes/{commande}', 'App\Http\Controllers\Api\CommandeController@show');
    Route::put('/commandes/{commande}', 'App\Http\Controllers\Api\CommandeController@update');
    Route::post('/commandes/{commande}/annuler', 'App\Http\Controllers\Api\CommandeController@annuler');

    // Routes pour les paiements
    Route::post('/commandes/{commande}/paiement', [PaiementController::class, 'createCheckoutSession']);
    Route::get('/paiement/success/{commande}', [PaiementController::class, 'handleSuccess'])->name('paiement.success');
    Route::get('/paiement/cancel/{commande}', [PaiementController::class, 'handleCancel'])->name('paiement.cancel');
    Route::post('/paiements/{paiement}/rembourser', [PaiementController::class, 'refundPayment']);

    // Routes pour les factures
    Route::get('/factures', [FactureController::class, 'index']);
    Route::get('/factures/{facture}', [FactureController::class, 'show']);
    Route::get('/factures/{facture}/telecharger', [FactureController::class, 'telecharger']);
    Route::post('/factures/{facture}/envoyer', [FactureController::class, 'envoyer']);
    Route::post('/commandes/{commande}/generer-facture', [FactureController::class, 'generer']);

    // Routes admin
    Route::middleware(['admin'])->group(function () {
        // Gestion des catégories
        Route::apiResource('admin/categories', 'App\Http\Controllers\Api\Admin\CategorieController');

        // Gestion des produits
        Route::apiResource('admin/produits', 'App\Http\Controllers\Api\Admin\ProduitController');

        // Gestion des commandes
        Route::apiResource('admin/commandes', 'App\Http\Controllers\Api\Admin\CommandeController');

        // Gestion des factures
        Route::apiResource('admin/factures', AdminFactureController::class);

        // Routes super admin
        Route::middleware(['super_admin'])->group(function () {
            // Gestion des utilisateurs
            Route::apiResource('admin/users', UserController::class);
            Route::put('admin/users/{user}/role', [UserController::class, 'changeRole']);
        });
    });
});

// Routes publiques
Route::get('/categories', [CategorieResourceController::class, 'index']);
Route::get('/categories/{slug}', [CategorieResourceController::class, 'show']);
Route::get('/categories/{slug}/produits', [CategorieResourceController::class, 'produits']);
Route::get('/produits', [ProduitResourceController::class, 'index']);
Route::get('/produits/{slug}', [ProduitResourceController::class, 'show']);
