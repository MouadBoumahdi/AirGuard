<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Alert extends Model
{
    protected $fillable = ['air_quality_id', 'manager_id', 'message', 'status'];

    public function airQuality(): BelongsTo
    {
        return $this->belongsTo(AirQuality::class, 'air_quality_id');
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}