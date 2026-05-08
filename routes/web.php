<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UrlController;
use App\Http\Controllers\RedirectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [UrlController::class, 'index'])
        ->name('dashboard');

    Route::post('/urls', [UrlController::class, 'store'])
        ->name('urls.store');

    Route::put('/urls/{id}', [UrlController::class, 'update'])
        ->name('urls.update');

    Route::delete('/urls/{id}', [UrlController::class, 'destroy'])
        ->name('urls.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

Route::get('/{code}', [RedirectController::class, 'handle'])
    ->name('short.redirect');

require __DIR__ . '/auth.php';
