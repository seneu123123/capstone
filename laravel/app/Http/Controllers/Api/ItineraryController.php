<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ItineraryController extends Controller
{
    public function show($bookingId)
    {
        return response()->json(['booking_id' => $bookingId, 'itinerary' => []]);
    }

    public function assignGuide(Request $request, $bookingId)
    {
        $validated = $request->validate([
            'guide_name' => 'required|string',
            'guide_contact' => 'required|string',
        ]);

        return response()->json(['message' => 'Tour guide assigned successfully']);
    }
}
