<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alerts', function (Blueprint $table) {
            $table->id();
            // Links to the specific toxic reading
            $table->foreignId('air_quality_id')->constrained('air_qualities')->onDelete('cascade');
            
            // CRITICAL: Links directly to your EXISTING users table
            $table->foreignId('manager_id')->nullable()->constrained('users')->onDelete('set null');
            
            $table->string('message');
            $table->enum('status', ['active', 'acknowledged', 'resolved'])->default('active');
            $table->timestamp('triggered_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alerts');
    }
};