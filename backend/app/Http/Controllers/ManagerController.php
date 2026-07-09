<?php

namespace App\Http\Controllers;

use App\Models\AirQuality;
use App\Models\Alert;
use App\Models\Threshold;
use Illuminate\Http\JsonResponse;

class ManagerController extends Controller
{
    public function getLatestGases(): JsonResponse
    {
        // 📌 ENFORCE ORDER CONFIGURATION: Explicit chart sequencing mapping starting with SO2
        $orderedGasTypes = ['SO2', 'H2S', 'NH3', 'HF'];
        $formattedGases = [];

        foreach ($orderedGasTypes as $type) {
            $latestReading = AirQuality::where('gas_type', $type)
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->first();

            $threshold = Threshold::where('gas_type', $type)->first();

            $fullName = match($type) {
                'SO2' => 'Sulfur Dioxide (SO2)',
                'H2S' => 'Hydrogen Sulfide (H2S)',
                'NH3' => 'Ammonia (NH3)',
                'HF'  => 'Hydrogen Fluoride (HF)',
                default => $type
            };

            // 🚀 CLEAN CODES & PURE FLOATS WITH DB LIMIT
            $formattedGases[] = [
                'name'  => $fullName,
                'value' => $latestReading ? (float) $latestReading->concentration_value : 0.0,
                'limit' => $threshold ? (float) $threshold->max_allowed_limit : 50.0
            ];
        }

        return response()->json([
            'success' => true,
            'gases'   => $formattedGases
        ]);
    }

    public function getActiveAlerts(): JsonResponse
    {
        $alerts = Alert::join('air_qualities', 'alerts.air_quality_id', '=', 'air_qualities.id')
            ->where('alerts.status', 'active')
            ->select(
                'alerts.id',
                'alerts.message',
                'alerts.created_at',
                'air_qualities.gas_type',
                'air_qualities.concentration_value',
                'air_qualities.wind_direction'
            )
            ->latest('alerts.id')
            ->get();

        return response()->json([
            'alerts' => $alerts
        ]);
    }

    public function getTrendAnalytics(): JsonResponse
    {
        // Maintains matching custom order keys for chart arrays
        $gasTypes = ['SO2', 'H2S', 'NH3', 'HF'];
        $trends = [];

        foreach ($gasTypes as $type) {
            $readings = AirQuality::where('gas_type', $type)
                ->orderByDesc('created_at')
                ->limit(10)
                ->get()
                ->reverse()
                ->values();

            $trends[$type] = $readings->map(function ($reading) {
                return [
                    'timestamp' => $reading->created_at ? $reading->created_at->format('H:i') : null,
                    'value' => (float) $reading->concentration_value,
                ];
            })->all();
        }

        return response()->json(['trends' => $trends]);
    }

    public function acknowledgeAlert($id): JsonResponse
    {
        $alert = Alert::find($id);

        if (!$alert) {
            return response()->json(['message' => 'Alert token not found'], 404);
        }

        $alert->update([
            'status' => 'acknowledged',
            'manager_id' => 1
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Boundary leak incident successfully acknowledged and cleared.'
        ]);
    }

    public function getComplianceHistory(): JsonResponse
    {
        $logs = Alert::join('air_qualities', 'alerts.air_quality_id', '=', 'air_qualities.id')
            ->where('alerts.status', 'acknowledged')
            ->select(
                'alerts.id',
                'alerts.updated_at as date',
                'air_qualities.gas_type',
                'air_qualities.concentration_value as peak_value'
            )
            ->latest('alerts.updated_at')
            ->get();

        return response()->json([
            'logs' => $logs
        ]);
    }
}