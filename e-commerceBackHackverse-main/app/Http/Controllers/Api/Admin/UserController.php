<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::when($request->has('search'), function ($query) use ($request) {
                return $query->where('nom', 'like', '%' . $request->search . '%')
                    ->orWhere('prenom', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            })
            ->when($request->has('role'), function ($query) use ($request) {
                return $query->where('role', $request->role);
            })
            ->orderBy($request->input('sort_by', 'created_at'), $request->input('sort_direction', 'desc'))
            ->paginate($request->input('per_page', 15));

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => ['required', 'string', Rule::in(['client', 'admin', 'super_admin'])],
            'adresse' => 'nullable|string|max:255',
            'ville' => 'nullable|string|max:255',
            'code_postal' => 'nullable|string|max:20',
            'pays' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:20',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'prenom' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8|confirmed',
            'role' => ['sometimes', 'required', 'string', Rule::in(['client', 'admin', 'super_admin'])],
            'adresse' => 'nullable|string|max:255',
            'ville' => 'nullable|string|max:255',
            'code_postal' => 'nullable|string|max:20',
            'pays' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:20',
        ]);

        if (isset($validated['password']) && $validated['password']) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Empêcher la suppression du super admin
        if ($user->role === 'super_admin') {
            return new JsonResponse([
                'message' => 'Impossible de supprimer un super administrateur.'
            ], 403);
        }

        $user->delete();

        return new JsonResponse([
            'message' => 'Utilisateur supprimé avec succès.'
        ]);
    }

    /**
     * Change the role of a user.
     */
    public function changeRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => ['required', 'string', Rule::in(['client', 'admin', 'super_admin'])],
        ]);

        $user->update([
            'role' => $validated['role']
        ]);

        return new UserResource($user);
    }
}
