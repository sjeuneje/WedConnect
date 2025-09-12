<?php

namespace App\Http\Controllers\Provider\Activity;

use App\Http\Controllers\Controller;
use App\Http\Requests\Activity\ActivityProviderPublishActivityRequest;
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

    public function publishActivity(ActivityProviderPublishActivityRequest $request)
    {
        $provider = $request->user()->provider;

        if ($request->boolean('isPublished')) {
            $provider->published_at = now();
            $successMessage = 'Votre activité a bien été publiée.';
        } else {
            $provider->published_at = null;
            $successMessage = "Votre activité a bien été dépubliée.";
        }

        $provider->save();
        return redirect()
            ->route('dashboard.provider.activity')
            ->with('success', $successMessage);
    }
}
