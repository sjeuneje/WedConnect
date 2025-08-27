<?php

use App\Http\Controllers\Couple\Dashboard\DashboardCoupleController;
use App\Http\Controllers\Provider\Dashboard\DashboardProviderController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::prefix('provider')->group(function () {
            Route::get('', [DashboardProviderController::class, 'index'])->name('dashboard.provider');
        });

        Route::prefix('couple')->group(function () {
            Route::get('', [DashboardCoupleController::class, 'index'])->name('dashboard.couple');
        });
    });
});
