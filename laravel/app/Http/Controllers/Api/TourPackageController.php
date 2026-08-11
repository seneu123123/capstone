<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TourPackageController extends Controller
{
    public function index()
    {
        $packages = DB::table('tour_packages')->where('status', 'Active')->get();
        return response()->json(['data' => $packages]);
    }

    public function show($id)
    {
        $package = DB::table('tour_packages')->where('id', $id)->first();
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }
        return response()->json(['data' => $package]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'destination' => 'required|string',
            'category' => 'required|string',
            'duration_days' => 'required|integer',
            'duration_nights' => 'required|integer',
            'price_per_pax' => 'required|numeric',
            'max_capacity' => 'required|integer',
        ]);

        $id = (string) \Illuminate\Support\Str::uuid();
        DB::table('tour_packages')->insert(array_merge($validated, [
            'id' => $id,
            'code' => 'PKG-' . strtoupper(\Illuminate\Support\Str::random(6)),
            'inclusions' => json_encode($request->input('inclusions', [])),
            'exclusions' => json_encode($request->input('exclusions', [])),
            'itinerary' => json_encode($request->input('itinerary', [])),
            'created_at' => now(),
            'updated_at' => now(),
        ]));

        return response()->json(['message' => 'Package created', 'id' => $id], 201);
    }

    public function update(Request $request, $id)
    {
        DB::table('tour_packages')->where('id', $id)->update(array_merge($request->only([
            'title', 'destination', 'category', 'price_per_pax', 'status'
        ]), ['updated_at' => now()]));

        return response()->json(['message' => 'Package updated']);
    }

    public function destroy($id)
    {
        DB::table('tour_packages')->where('id', $id)->delete();
        return response()->json(['message' => 'Package deleted']);
    }
}
