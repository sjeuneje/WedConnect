<?php

namespace App\Http\Controllers\Couple\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardCoupleController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/couple', []);
    }
}
