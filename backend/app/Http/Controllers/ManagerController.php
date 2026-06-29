<?php

namespace App\Http\Controllers;

use App\Models\AirQuality;

class ManagerController extends Controller
{
    public function getLatestGases()
    {
        $gasTypes = ['SO2', 'H2S', 'NH3', 'HF'];
        $formattedGases = [];

        foreach ($gasTypes as $type) {
            $latestReading = AirQuality::where('gas_type', $type)->first();

            $fullName = match($type) {
                'SO2' => 'Sulfur Dioxide (SO2)',
                'H2S' => 'Hydrogen Sulfide (H2S)',
                'NH3' => 'Ammonia (NH3)',
                'HF'  => 'Hydrogen Fluoride (HF)',
                default => $type
            };

            $value = $latestReading ? $latestReading->concentration_value . ' ppm' : '0.0 ppm';

            $formattedGases[] = [
                'name' => $fullName,
                'value' => $value
            ];
        }

        return response()->json(['gases' => $formattedGases]);
    }
}