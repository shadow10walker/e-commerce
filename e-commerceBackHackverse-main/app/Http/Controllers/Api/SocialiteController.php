<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Rediriger l'utilisateur vers le fournisseur OAuth.
     *
     * @param string $provider
     * @return \Illuminate\Http\JsonResponse
     */
    public function redirectToProvider(string $provider): JsonResponse
    {
        // Vérifier si le provider est supporté
        if (!in_array($provider, ['google'])) {
            return response()->json([
                'message' => 'Fournisseur d\'authentification non supporté.'
            ], 400);
        }

        // Pour une API, nous retournons simplement l'URL de redirection
        // Le frontend doit rediriger l'utilisateur vers cette URL
        $url = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();

        return response()->json([
            'url' => $url
        ]);
    }

    /**
     * Obtenir les informations utilisateur du fournisseur OAuth.
     *
     * @param Request $request
     * @param string $provider
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleProviderCallback(Request $request, string $provider): JsonResponse
    {
        // Vérifier si le provider est supporté
        if (!in_array($provider, ['google'])) {
            return response()->json([
                'message' => 'Fournisseur d\'authentification non supporté.'
            ], 400);
        }

        try {
            // Récupérer l'utilisateur OAuth
            $socialUser = Socialite::driver($provider)->stateless()->user();

            // Trouver ou créer l'utilisateur dans notre base de données
            $user = User::firstOrCreate(
                ['email' => $socialUser->getEmail()],
                [
                    'nom' => $socialUser->getName() ?? explode(' ', $socialUser->getName())[1] ?? '',
                    'prenom' => explode(' ', $socialUser->getName())[0] ?? $socialUser->getName() ?? '',
                    'email' => $socialUser->getEmail(),
                    'password' => Hash::make(Str::random(16)),
                    'role' => 'client',
                    'google_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                ]
            );

            // Mettre à jour les informations Google si l'utilisateur existe déjà
            if (!$user->wasRecentlyCreated) {
                $user->update([
                    'google_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                ]);
            }

            // Générer un token pour l'API
            $token = $user->createToken('google-auth')->plainTextToken;

            return response()->json([
                'message' => 'Connexion réussie',
                'user' => new UserResource($user),
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de l\'authentification: ' . $e->getMessage()
            ], 500);
        }
    }
}
