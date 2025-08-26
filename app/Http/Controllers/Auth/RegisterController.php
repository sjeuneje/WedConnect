<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterNewUserRequest;
use App\Models\Couple;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function store(RegisterNewUserRequest $request)
    {
        $user = User::query()
            ->create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'country' => $request->country,
                'phone_number' => $request->phone_number
            ]);

        switch ($request->role) {
            case 'provider':
                Provider::query()
                    ->create([
                        'user_id' => $user->id,
                        'company_name' => $request->company_name
                    ]);
                break;
            case 'couple':
                Couple::query()
                    ->create([
                        'user_id' => $user->id,
                        'name' => $request->name
                    ]);
                break;
            default:
                abort(400, 'Rôle invalide.');
        }

        return redirect()
            ->route('home')
            ->with([
                'success' => 'Inscription réussie, bienvenue chez WedConnect !'
            ]);
    }
}
