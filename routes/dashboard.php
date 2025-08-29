<?php

use App\Http\Controllers\Couple\Dashboard\DashboardCoupleController;
use App\Http\Controllers\Provider\Dashboard\DashboardProviderController;
use App\Http\Controllers\Provider\Settings\SettingsProviderController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::prefix('provider')->group(function () {
            Route::get('', [DashboardProviderController::class, 'index'])->name('dashboard.provider');

            Route::prefix('settings')->group(function () {
                Route::get('', [SettingsProviderController::class, 'index'])->name('dashboard.provider.settings');
                Route::patch('user', [SettingsProviderController::class, 'updateUser'])->name('dashboard.provider.settings.user');
                Route::post('activity', [SettingsProviderController::class, 'updateActivity'])->name('dashboard.provider.settings.activity');
            });
        });

        Route::prefix('couple')->group(function () {
            Route::get('', [DashboardCoupleController::class, 'index'])->name('dashboard.couple');
        });
    });
});
