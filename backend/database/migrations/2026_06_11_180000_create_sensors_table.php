<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gas_sensors', function (Blueprint $table) {
            $table->id();
            $table->string('sensor_name'); // Ex: "Capteur Cheminée Nord"
            $table->string('location');    // Ex: "Zone Ligne A"
            $table->enum('status', ['active', 'inactive', 'maintenance'])->default('active');
            $table->date('last_calibration_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gas_sensors');
    }
};