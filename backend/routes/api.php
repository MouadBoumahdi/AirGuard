<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\SimulatorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagerController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [AuthController::class, 'sendResetLink']);
Route::post('/reset-password', [AuthController::class, 'executeResetPassword']);

Route::get('/test-simulator', function() {
    return (new SimulatorController)->generateDynamicData('normal');
});

Route::get('/manager/latest-gases', [ManagerController::class, 'getLatestGases']);
Route::get('/manager/alerts/active', [ManagerController::class, 'getActiveAlerts']);
Route::post('/manager/alerts/{id}/acknowledge', [ManagerController::class, 'acknowledgeAlert']);
Route::get('/manager/alerts/history', [ManagerController::class, 'getComplianceHistory']);

Route::middleware(['jwt.auth'])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index']);
    Route::post('/create-manager', [AdminController::class, 'store']);
    Route::patch('/toggle-ban/{id}', [AdminController::class, 'toggleBan']);

    Route::put('/update-password', [AdminController::class, 'updatePassword']);
});