<?php

namespace App\Policies;

use App\Models\Commande;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CommandePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Commande $commande): bool
    {
        return $user->id === $commande->user_id || $user->isAdmin();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Commande $commande): bool
    {
        return $user->id === $commande->user_id || $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Commande $commande): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Commande $commande): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Commande $commande): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can cancel the model.
     */
    public function cancel(User $user, Commande $commande): bool
    {
        return $user->id === $commande->user_id || $user->isAdmin();
    }
}
