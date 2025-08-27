<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        switch ($user->role) {
            case $user->role == 'provider':
                return redirect()->intended(route('dashboard.provider', absolute: false));
            case $user->role === 'couple':
                return redirect()->intended(route('dashboard.couple', absolute: false));
            default:
                abort(404, 'Role inconnu.');
        }
    }

    public function create()
    {
        return Inertia::render('auth/login', []);
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(route('login.create'));
    }
}
