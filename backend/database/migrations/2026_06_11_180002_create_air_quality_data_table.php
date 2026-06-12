<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('air_quality_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sensor_id')->constrained()->cascadeOnDelete();
            $table->string('gas_type');
            $table->float('value');
            $table->string('unit');
            $table->timestamp('measured_at');
            $table->timestamps();

            // Indexes for optimizing historical/time-series queries
            $table->index('measured_at');
            $table->index(['sensor_id', 'gas_type', 'measured_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('air_quality_data');
    }
};
