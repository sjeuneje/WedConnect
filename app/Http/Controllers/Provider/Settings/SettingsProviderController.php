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
