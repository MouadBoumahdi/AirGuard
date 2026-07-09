<?php

namespace App\Http\Controllers;

use App\Models\GasSensor;
use App\Models\AirQuality;
use App\Models\Threshold;
use App\Models\Alert;

class SimulatorController extends Controller
{
   public function generateDynamicData($mode)
    {
        // Ensure default thresholds exist in DB
        if (Threshold::count() === 0) {
            $defaultGases = [
                ['gas_type' => 'SO2', 'max_allowed_limit' => 100.00, 'severity_level' => 'Critical'],
                ['gas_type' => 'H2S', 'max_allowed_limit' => 50.00,  'severity_level' => 'Critical'],
                ['gas_type' => 'NH3', 'max_allowed_limit' => 35.00,  'severity_level' => 'Critical'],
                ['gas_type' => 'HF',  'max_allowed_limit' => 20.00,  'severity_level' => 'Critical'],
            ];
            foreach ($defaultGases as $gas) { 
                Threshold::create($gas); 
            }
        }

        $threshold = Threshold::inRandomOrder()->first();

        // Link or create the sensor asset mapping
        $sensor = GasSensor::firstOrCreate(
            ['id' => Threshold::where('gas_type', $threshold->gas_type)->first()->id],
            [
                'sensor_name' => "Automated " . $threshold->gas_type . " Sensor Node",
                'location' => 'OCP Industrial Perimeter Grid',
                'status' => 'active'
            ]
        );

        if ($mode === 'critical') {
            // 🚀 GUARANTEED SPIKE: Force concentration way above the database limit
            $concentration = $threshold->max_allowed_limit + rand(50, 150);
            $windDirection = 'towards_city'; 
        } else {
            // Safe normal concentration under the limit
            $concentration = rand(5, (int) $threshold->max_allowed_limit - 5);
            $windDirection = 'towards_city'; 
        }

        // Store reading to historical timeline log
        $airQuality = AirQuality::updateOrCreate([
            'sensor_id' => $sensor->id,
            'gas_type' => $threshold->gas_type,
            'concentration_value' => $concentration,
            'wind_direction' => $windDirection
        ]);

        // Raise a live alert if thresholds are violated or reached (>=)
        $alertTriggered = false;
        if ($airQuality->concentration_value >= $threshold->max_allowed_limit && $airQuality->wind_direction === 'towards_city') {
            
            // 1. Create the alert entry in our database
            $alert = Alert::create([
                'air_quality_id' => $airQuality->id,
                'manager_id' => null,
                'message' => "AUTOMATED DETECTOR WARNING: An unpredicted toxic leak event has occurred for {$threshold->gas_type} at {$concentration} ppm blowing directly into municipal zones.",
                'status' => 'active'
            ]);

            // 2. ⚡ FIRE AUTOMATED EMAILS TO ENVIRONMENT MANAGERS
            try {
                // 🔎 MATCHES YOUR DATABASE ROW: 'environment_manager'
                $managers = User::where('role', 'environment_manager')->get();
                if ($managers->isNotEmpty()) {
                    Notification::send($managers, new \App\Notifications\CriticalGasLeakAlert($alert));
                }
            } catch (\Exception $e) {
                \Log::error("Automated Alert Email Error: " . $e->getMessage());
            }

            $alertTriggered = true;
        }

        return [
            'automated_execution' => true,
            'mode_chosen' => $mode,
            'gas' => $threshold->gas_type,
            'concentration' => (float) $concentration,
            'wind_direction' => $windDirection,
            'alert_raised' => $alertTriggered
        ];
    }
}