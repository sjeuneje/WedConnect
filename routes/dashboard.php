<?php

use App\Http\Controllers\Couple\Dashboard\DashboardCoupleController;
use App\Http\Controllers\Provider\Activity\ActivityProviderController;
use App\Http\Controllers\Provider\Dashboard\DashboardProviderController;
use App\Http\Controllers\Provider\Services\ServicesProviderController;
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

            Route::prefix('services')->group(function () {
                Route::get('', [ServicesProviderController::class, 'index'])->name('dashboard.provider.services');
                Route::post('', [ServicesProviderController::class, 'store'])->name('dashboard.provider.services.store');
                Route::post('{service}', [ServicesProviderController::class, 'update'])->name('dashboard.provider.services.update');
                Route::delete('', [ServicesProviderController::class, 'delete'])->name('dashboard.provider.services.delete');
            });

            Route::prefix('activity')->group(function () {
                Route::get('', [ActivityProviderController::class, 'show'])->name('dashboard.provider.activity');
                Route::patch('publish', [ActivityProviderController::class, 'publishActivity'])->name('dashboard.provider.activity.publish');
            });
        });

        Route::prefix('couple')->group(function () {
            Route::get('', [DashboardCoupleController::class, 'index'])->name('dashboard.couple');
        });
    });
});
