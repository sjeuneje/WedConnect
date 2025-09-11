<?php

namespace App\Http\Controllers\Provider\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateActivitySettingsProviderRequest;
use App\Http\Requests\Settings\UpdateUserSettingsProviderRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

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
        return redirect()->route('dashboard.provider.settings')
            ->with('success', 'Vos paramètres ont bien été mis à jour.');
    }

    public function updateActivity(UpdateActivitySettingsProviderRequest $request)
    {
        $provider = auth()->user()->provider;
        $data = $request->validated();

        $oldLogoPath = $provider?->logo;
        if ($request->hasFile('logo')) {
            try {
                $path = $request->file('logo')->store('provider_logos', 'public');
                $data['logo'] = $path;

                if ($oldLogoPath) {
                    Storage::disk('public')->delete($oldLogoPath);
                }
            } catch (Throwable $e) {
                Log::error($e->getMessage());
            }
        } else {
            unset($data['logo']);
        }

        $data = array_filter($data, fn($value) => !empty($value));

        if (!empty($data)) {
            $provider->update($data);
        }

        return redirect()->route('dashboard.provider.settings', ['selectedTab' => 'activity'])
            ->with('success', 'Vos paramètres ont bien été mis à jour.');
    }
}
