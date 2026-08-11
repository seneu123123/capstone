<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    public function issueHotelVoucher(Request $request, $bookingId)
    {
        return response()->json(['message' => 'Hotel voucher issued', 'voucher_code' => 'HTL-' . strtoupper(\Illuminate\Support\Str::random(8))]);
    }

    public function issueTransportVoucher(Request $request, $bookingId)
    {
        return response()->json(['message' => 'Transport voucher issued', 'voucher_code' => 'TRN-' . strtoupper(\Illuminate\Support\Str::random(8))]);
    }
}
