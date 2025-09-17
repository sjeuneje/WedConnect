<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class ListingProviders extends Controller
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
}
