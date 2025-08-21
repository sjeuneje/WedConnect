<?php

use App\Http\Controllers\Auth\Registering\CountryRegisteringController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', []);
})->name('home');

Route::prefix('register')->group(function () {
   Route::get('country', [CountryRegisteringController::class, 'create'])->name('register.country');
});

require __DIR__.'/auth.php';
