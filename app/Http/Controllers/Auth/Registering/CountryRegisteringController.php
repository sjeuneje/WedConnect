<?php

namespace App\Http\Controllers\Auth\Registering;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CountryRegisteringController extends Controller
{
    /**
     * Show the country registration page.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('register/country', [
            'countries' => Country::all(),
            'totalSteps' => 4,
            'currentStep' => 1,
            'nextStepHref' => 'register.country',
            'previousStepHref' => 'home'
        ]);
    }
}
