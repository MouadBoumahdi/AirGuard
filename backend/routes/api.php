<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



Route::middleware(['jwt.auth'])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index']);
    Route::post('/create-manager', [AdminController::class, 'store']);
    Route::patch('/toggle-ban/{id}', [AdminController::class, 'toggleBan']);

    Route::put('/update-password', [AdminController::class, 'updatePassword']);
});