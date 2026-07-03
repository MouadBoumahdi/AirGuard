<?php

namespace Tests\Feature;

use App\Models\AirQuality;
use App\Models\GasSensor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ManagerControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_the_latest_gas_reading_for_each_type(): void
    {
        $sensor = GasSensor::create([
            'sensor_name' => 'Test Sensor',
            'location' => 'Zone A',
            'status' => 'active',
            'last_calibration_date' => now()->toDateString(),
        ]);

        AirQuality::create([
            'sensor_id' => $sensor->id,
            'gas_type' => 'SO2',
            'concentration_value' => 10.50,
            'wind_direction' => 'NE',
            'created_at' => now()->subMinutes(10),
            'updated_at' => now()->subMinutes(10),
        ]);

        AirQuality::create([
            'sensor_id' => $sensor->id,
            'gas_type' => 'SO2',
            'concentration_value' => 22.30,
            'wind_direction' => 'SW',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->getJson('/api/manager/latest-gases');

        $response->assertOk();
        $response->assertJsonFragment([
            'name' => 'Sulfur Dioxide (SO2)',
            'value' => '22.30 ppm',
        ]);
        $response->assertJsonMissing([
            'name' => 'Sulfur Dioxide (SO2)',
            'value' => '10.50 ppm',
        ]);
    }
}
