<?php

namespace App\Http\Controllers\Couple\Wedding;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateWeddingCoupleRequest;
use App\Models\Couple;
use App\Models\Couples\Providers\CoupleProviderFavorite;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WeddingCoupleController extends Controller
{
    public function index()
    {
        $favoriteProvidersIds = CoupleProviderFavorite::query()
            ->where('couple_id', Auth::user()->couple->id)
            ->pluck('provider_id');

        $users = User::with([
            'provider.services.photos',
            'provider.services.rates',
            'provider.services.options.rate',
        ])
            ->whereHas('provider', function ($query) use ($favoriteProvidersIds) {
                $query->whereNotNull('published_at');
                $query->whereIn('id', $favoriteProvidersIds);
            })
            ->get();

        return Inertia::render('dashboard/couple/wedding', [
            'user' => User::with('couple')->findOrFail(Auth::id()),
            'currentRoute' => request()->route()->getName(),
            'bookmarks' => $users
        ]);
    }

    public function update(UpdateWeddingCoupleRequest $request)
    {
        Couple::query()
            ->where('id', Auth::user()->couple->id)
            ->update($request->validated());

        return back()->with(['success' => 'Vos informations ont bien été modifiées.']);
    }
}
