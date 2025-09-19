<?php

namespace App\Http\Controllers\Couple\Providers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Favorite\DeleteCoupleProviderFavoriteRequest;
use App\Http\Requests\Favorite\StoreCoupleProviderFavoriteRequest;
use App\Models\Couple;
use App\Models\Couples\Providers\CoupleProviderFavorite;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function store(StoreCoupleProviderFavoriteRequest $request)
    {
        CoupleProviderFavorite::query()
            ->create([
               'provider_id' => $request->provider_id,
               'couple_id' => Auth::user()->couple->id
            ]);

        return back()->with('success', 'Prestataire ajouté aux favoris.');
    }

    public function delete(DeleteCoupleProviderFavoriteRequest $request)
    {
        CoupleProviderFavorite::query()
            ->where([
                'provider_id' => $request->provider_id,
                'couple_id' => Auth::user()->couple->id
            ])
            ->delete();

        return back()->with('success', 'Prestataire retiré des favoris.');
    }
}
