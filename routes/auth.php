<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\RegisterWizardController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::prefix('register')->group(function () {
        Route::post('', [RegisterController::class, 'store'])->name('register');
        Route::get('country', [RegisterWizardController::class, 'country'])->name('register.country');
        Route::get('roles', [RegisterWizardController::class, 'roles'])->name('register.roles');
        Route::get('user', [RegisterWizardController::class, 'user'])->name('register.user');
        Route::get('credentials', [RegisterWizardController::class, 'credentials'])->name('register.credentials');
    });

    Route::prefix('login')->group(function () {
        Route::post('', [LoginController::class, 'store'])->name('login.store');
        Route::get('', [LoginController::class, 'create'])->name('login.create');
    });
});
