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
        Schema::create('alerts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sensor_id')->constrained()->cascadeOnDelete();
            $table->foreignId('threshold_id')->constrained()->cascadeOnDelete();
            $table->enum('severity_level', ['low', 'medium', 'high', 'critical']);
            $table->enum('status', ['active', 'acknowledged', 'resolved'])->default('active');
            $table->timestamps();

            // Indexes for querying alerts
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alerts');
    }
};
