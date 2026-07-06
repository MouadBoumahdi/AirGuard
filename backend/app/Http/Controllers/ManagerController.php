<?php

namespace App\Http\Controllers;

use App\Models\AirQuality;
use App\Models\Alert;

class ManagerController extends Controller
{
    public function getLatestGases()
    {
        $gasTypes = ['SO2', 'H2S', 'NH3', 'HF'];
        $formattedGases = [];

        foreach ($gasTypes as $type) {
            $latestReading = AirQuality::where('gas_type', $type)
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->first();

            $fullName = match($type) {
                'SO2' => 'Sulfur Dioxide (SO2)',
                'H2S' => 'Hydrogen Sulfide (H2S)',
                'NH3' => 'Ammonia (NH3)',
                'HF'  => 'Hydrogen Fluoride (HF)',
                default => $type
            };

            $value = $latestReading ? number_format((float) $latestReading->concentration_value, 2, '.', '') . ' ppm' : '0.0 ppm';

            $formattedGases[] = [
                'name' => $fullName,
                'value' => $value
            ];
        }

        return response()->json(['gases' => $formattedGases]);
    }




    public function getActiveAlerts()
    {
        // Simply join the alerts table directly with air_qualities
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

    public function getTrendAnalytics()
    {
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


    public function acknowledgeAlert($id)
    {
        $alert = Alert::find($id);

        if (!$alert) {
            return response()->json(['message' => 'Alert token not found'], 404);
        }

        // Instead of deleting it, we change the status to historical log format
        $alert->update([
            'status' => 'acknowledged',
            'manager_id' => 1 // Temporary fallback manager profile assignment ID
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Boundary leak incident successfully acknowledged and cleared.'
        ]);
    }




    public function getComplianceHistory()
    {
        // Fetch everything that has been acknowledged and cleared by managers
        $logs = Alert::join('air_qualities', 'alerts.air_quality_id', '=', 'air_qualities.id')
            ->where('alerts.status', 'acknowledged')
            ->select(
                'alerts.id',
                'alerts.updated_at as date', // The moment it was cleared
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