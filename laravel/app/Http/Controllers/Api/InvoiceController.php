<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function show($id)
    {
        return response()->json(['invoice_id' => $id, 'status' => 'Pending', 'total' => 0.00]);
    }

    public function recordPayment(Request $request, $id)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
            'payment_method' => 'required|string',
        ]);

        return response()->json(['message' => 'Payment recorded successfully', 'invoice_id' => $id]);
    }
}
