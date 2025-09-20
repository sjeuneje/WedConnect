<?php

use App\Http\Controllers\Couple\Dashboard\DashboardCoupleController;
use App\Http\Controllers\Couple\Providers\FavoriteController;
use App\Http\Controllers\Couple\Settings\SettingsCoupleController;
use App\Http\Controllers\Couple\Wedding\WeddingCoupleController;
use App\Http\Controllers\ListingProvidersController;
use App\Http\Controllers\Provider\Activity\ActivityProviderController;
use App\Http\Controllers\Provider\Dashboard\DashboardProviderController;
use App\Http\Controllers\Provider\Services\ServicesProviderController;
use App\Http\Controllers\Provider\Settings\SettingsProviderController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::prefix('user')->group(function () {
            Route::patch('', [UserController::class, 'update'])->name('dashboard.user');
        });

        Route::prefix('provider')->group(function () {
            Route::get('', [DashboardProviderController::class, 'index'])->name('dashboard.provider');

            Route::prefix('settings')->group(function () {
                Route::get('', [SettingsProviderController::class, 'index'])->name('dashboard.provider.settings');
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

            Route::prefix('wedding')->group(function () {
               Route::get('', [WeddingCoupleController::class, 'index'])->name('dashboard.couple.wedding');
               Route::patch('', [WeddingCoupleController::class, 'update'])->name('dashboard.couple.wedding.update');
            });

            Route::prefix('settings')->group(function () {
               Route::get('', [SettingsCoupleController::class, 'index'])->name('dashboard.couple.settings');
            });

            Route::prefix('providers')->group(function () {
                Route::prefix('favorite')->group(function () {
                    Route::post('', [FavoriteController::class, 'store'])->name('dashboard.couple.providers.favorite');
                    Route::delete('', [FavoriteController::class, 'delete'])->name('dashboard.couple.providers.favorite');
                });
            });
        });

        Route::prefix('listing-providers')->group(function () {
            Route::get('', [ListingProvidersController::class, 'index'])->name('dashboard.listing-providers.index');
            Route::get('{id}', [ListingProvidersController::class, 'show'])->name('dashboard.listing-providers.show');
        });
    });
});
