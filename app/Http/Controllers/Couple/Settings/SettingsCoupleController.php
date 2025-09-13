<?php

namespace App\Http\Controllers\Couple\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsCoupleController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/couple/settings', [
            'user' => User::with('couple')->findOrFail(Auth::id()),
            'currentRoute' => request()->route()->getName()
        ]);
    }
}
