<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Invoice;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    /**
     * List all customer bookings from PostgreSQL
     */
    public function index(Request $request)
    {
        $query = Booking::with(['invoice', 'hotelReservation', 'transportReservation']);

        if ($request->has('status')) {
            $query->where('booking_status', $request->status);
        }

        $bookings = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'count' => $bookings->count(),
            'data' => $bookings
        ]);
    }

    /**
     * Register a new Tour Booking and generate Invoice
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tour_package_id' => 'required|string',
            'tour_title' => 'required|string',
            'customer' => 'required|array',
            'customer.full_name' => 'required|string',
            'customer.email' => 'required|email',
            'customer.phone' => 'required|string',
            'passengers' => 'required|array|min:1',
            'travel_date' => 'required|date',
            'num_pax' => 'required|integer|min:1',
            'total_price' => 'required|numeric',
        ]);

        $bookingRef = 'TT-' . date('Y') . '-' . rand(1000, 9999);
        $depositRequired = $validated['total_price'] * 0.30; // 30% Downpayment

        $booking = Booking::create([
            'id' => (string) Str::uuid(),
            'booking_ref' => $bookingRef,
            'tour_package_id' => $validated['tour_package_id'],
            'tour_title' => $validated['tour_title'],
            'customer' => $validated['customer'],
            'passengers' => $validated['passengers'],
            'travel_date' => $validated['travel_date'],
            'num_pax' => $validated['num_pax'],
            'total_price' => $validated['total_price'],
            'deposit_required' => $depositRequired,
            'booking_status' => 'Confirmed',
            'payment_status' => 'Unpaid',
            'created_at' => now(),
        ]);

        // Auto-generate invoice record in PostgreSQL
        $invoice = Invoice::create([
            'id' => (string) Str::uuid(),
            'booking_id' => $booking->id,
            'invoice_number' => 'INV-' . date('Y') . '-' . rand(100, 999),
            'issue_date' => now()->toDateString(),
            'due_date' => now()->addDays(7)->toDateString(),
            'total_amount' => $validated['total_price'],
            'amount_paid' => 0,
            'balance_due' => $validated['total_price'],
            'status' => 'Unpaid',
            'payments' => []
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Booking successfully registered',
            'booking_ref' => $bookingRef,
            'data' => $booking->load('invoice')
        ], 201);
    }

    /**
     * Show specific booking details
     */
    public function show($id)
    {
        $booking = Booking::with(['invoice', 'hotelReservation', 'transportReservation'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $booking
        ]);
    }

    /**
     * Update Booking Status (Operator action)
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Confirmed,Pending,Completed,Cancelled'
        ]);

        $booking = Booking::findOrFail($id);
        $booking->booking_status = $request->status;
        $booking->save();

        return response()->json([
            'status' => 'success',
            'message' => "Booking status updated to {$request->status}",
            'data' => $booking
        ]);
    }
}
