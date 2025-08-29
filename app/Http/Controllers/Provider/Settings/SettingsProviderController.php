<?php

namespace App\Http\Controllers\Provider\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateUserSettingsProviderRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsProviderController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/provider/settings', [
            'user' => User::with('provider')->findOrFail(Auth::id()),
            'currentRoute' => request()->route()->getName()
        ]);
    }

    public function updateUser(UpdateUserSettingsProviderRequest $request)
    {
        dd($request);
    }
}
