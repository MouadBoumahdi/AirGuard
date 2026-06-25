<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('air_qualities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sensor_id')->constrained('gas_sensors')->onDelete('cascade');
            $table->string('gas_type');
            $table->decimal('concentration_value', 8, 2);
            $table->enum('wind_direction', ['vers_ville', 'oppose_ville'])->default('oppose_ville');
            $table->timestamps(); // Génère automatiquement created_at et updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('air_qualities');
    }
};