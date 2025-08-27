<?php

namespace App\Http\Controllers\Provider\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardProviderController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/provider', [
            'user' => User::with('provider')->findOrFail(Auth::id()),
            'currentRoute' => request()->route()->getName()
        ]);
    }
}
