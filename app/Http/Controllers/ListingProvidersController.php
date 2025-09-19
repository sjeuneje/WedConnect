<?php

namespace App\Http\Controllers;

use App\Models\Couples\Providers\CoupleProviderFavorite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ListingProvidersController extends Controller
{
    public function index()
    {
        $users = User::with([
            'provider.services.photos',
            'provider.services.rates',
            'provider.services.options.rate',
        ])
            ->whereHas('provider', function ($query) {
                $query->whereNotNull('published_at');
            })
            ->get();

        return Inertia::render('dashboard/couple/listing-providers', [
            'currentRoute' => request()->route()->getName(),
            'providers' => $users
        ]);
    }

    public function show(int $id)
    {
        $user = User::with([
            'provider.services.photos',
            'provider.services.rates',
            'provider.services.options.rate',
        ])
            ->whereHas('provider', function ($query) {
                $query->whereNotNull('published_at');
            })
            ->findOrFail($id);

        $user->provider->is_favorite_tagged = CoupleProviderFavorite::query()
            ->where([
                'couple_id' => Auth::user()->couple->id,
                'provider_id' => $user->provider->id
            ])
            ->exists();

        if (!$user->provider) {
            abort(400, "Vous ne pouvez pas voir le profil de ce genre d'utilisateur.");
        }

        return Inertia::render('dashboard/couple/listing-providers/profile', [
            'user' => $user,
            'billingUnits' => config('billing_units'),
        ]);
    }
}
