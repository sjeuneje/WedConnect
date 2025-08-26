<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterWizardCredentialsStepRequest;
use App\Http\Requests\Auth\RegisterWizardRoleStepRequest;
use App\Http\Requests\Auth\RegisterWizardUserStepRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RegisterWizardController extends Controller
{
    private int $totalSteps = 4;

    public function country(): Response
    {
        return Inertia::render('auth/register/country', [
            'countries'       => config('countries'),
            'totalSteps'      => $this->totalSteps,
            'currentStep'     => 1,
            'nextStepHref'    => 'register.roles',
            'previousStepHref'=> 'home',
        ]);
    }

    public function roles(RegisterWizardRoleStepRequest $request): Response
    {
        return Inertia::render('auth/register/roles', [
            'roles'           => config('roles'),
            'totalSteps'      => $this->totalSteps,
            'currentStep'     => 2,
            'nextStepHref'    => 'register.user',
            'previousStepHref'=> 'register.country',
        ]);
    }

    public function user(RegisterWizardUserStepRequest $request): Response
    {
        $currentStep  = 3;
        $nextStepHref = 'register.credentials';

        if ($request->role === 'couple') {
            return Inertia::render('auth/register/user/couple', [
                'totalSteps'      => $this->totalSteps,
                'currentStep'     => $currentStep,
                'nextStepHref'    => $nextStepHref,
                'previousStepHref'=> 'register.roles',
            ]);
        }

        if ($request->role === 'provider') {
            return Inertia::render('auth/register/user/provider', [
                'totalSteps'      => $this->totalSteps,
                'currentStep'     => $currentStep,
                'nextStepHref'    => $nextStepHref,
                'previousStepHref'=> 'register.roles',
            ]);
        }

        abort(404, 'Role not supported');
    }

    public function credentials(RegisterWizardCredentialsStepRequest $request): Response
    {
        return Inertia::render('auth/register/credentials', [
            'totalSteps'      => $this->totalSteps,
            'currentStep'     => 4,
            'nextStepHref'    => null,
            'previousStepHref'=> 'register.user',
        ]);
    }
}
