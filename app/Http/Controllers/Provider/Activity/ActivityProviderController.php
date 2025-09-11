<?php

namespace App\Http\Controllers\Provider\Activity;

use App\Http\Controllers\Controller;
use App\Models\Providers\Services\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ActivityProviderController extends Controller
{
    public function show()
    {
        return Inertia::render('dashboard/provider/activity', [
            'user' => User::with(['provider.services.photos', 'provider.services.rates', 'provider.services.options.rate',])->find(Auth::id()),
            'currentRoute' => request()->route()->getName(),
            'billingUnits' => config('billing_units')
        ]);
    }
}
