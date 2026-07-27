<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SanctumAuthController;
use App\Http\Controllers\Api\TourPackageController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ItineraryController;
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\FeedbackController;

/*
|--------------------------------------------------------------------------
| REST API Routes - Laravel Sanctum & PostgreSQL Backend
| Capstone: Tour Operations & Customer Booking System
|--------------------------------------------------------------------------
*/

// Public Authentication Endpoints
Route::prefix('v1/auth')->group(function () {
    Route::post('/register', [SanctumAuthController::class, 'register']);
    Route::post('/login', [SanctumAuthController::class, 'login']);
});

// Public Catalog Access
Route::prefix('v1')->group(function () {
    Route::get('/packages', [TourPackageController::class, 'index']);
    Route::get('/packages/{id}', [TourPackageController::class, 'show']);
    Route::get('/feedbacks', [FeedbackController::class, 'index']);
    Route::post('/feedbacks', [FeedbackController::class, 'store']);
});

// Protected Endpoints - Requires Sanctum Bearer Token
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    // Auth User Profile
    Route::get('/auth/me', [SanctumAuthController::class, 'me']);
    Route::post('/auth/logout', [SanctumAuthController::class, 'logout']);

    // Tour Package Management (Admin/Operator)
    Route::post('/packages', [TourPackageController::class, 'store']);
    Route::put('/packages/{id}', [TourPackageController::class, 'update']);
    Route::delete('/packages/{id}', [TourPackageController::class, 'destroy']);

    // Customer Booking Manifest REST API
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::patch('/bookings/{id}/status', [BookingController::class, 'updateStatus']);

    // Itinerary & Guide Assignment REST API
    Route::get('/itineraries/{bookingId}', [ItineraryController::class, 'show']);
    Route::patch('/itineraries/{bookingId}/guide', [ItineraryController::class, 'assignGuide']);

    // Hotel & Transport Voucher REST API
    Route::post('/bookings/{bookingId}/vouchers/hotel', [VoucherController::class, 'issueHotelVoucher']);
    Route::post('/bookings/{bookingId}/vouchers/transport', [VoucherController::class, 'issueTransportVoucher']);

    // Billing & Invoice REST API
    Route::get('/invoices/{id}', [InvoiceController::class, 'show']);
    Route::post('/invoices/{id}/payments', [InvoiceController::class, 'recordPayment']);
});
