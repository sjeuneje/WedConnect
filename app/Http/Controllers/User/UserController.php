<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function update(UpdateUserRequest $request)
    {
        $user = Auth::user();

        $data = collect($request->validated())->filter(fn ($value) => !empty($value))->toArray();
        if (empty($data))
            return redirect()->route('dashboard.provider.settings');

        if (!empty($data['password']) && !empty($data['new_password'])) {
            if (!Hash::check($data['password'], $user->password)) {
                return back()->withErrors([
                    'password' => 'Le mot de passe actuel est incorrect.',
                ]);
            }

            $data['password'] = Hash::make($data['new_password']);
            unset($data['new_password'], $data['new_password_confirmation']);
        } else {
            unset($data['password'], $data['new_password'], $data['new_password_confirmation']);
        }

        $user->update($data);
        return back()->with(
            'success', 'Vos paramètres ont bien été mis à jour.'
        );

    }
}
