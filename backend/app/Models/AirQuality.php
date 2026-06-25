<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AirQuality extends Model
{

    protected $fillable = ['sensor_id', 'gas_type', 'concentration_value', 'wind_direction'];

    public function sensor(): BelongsTo
    {
        return $this->belongsTo(GasSensor::class, 'sensor_id');
    }

    public function alerts(): HasMany
    {
        return $this->hasMany(Alert::class, 'air_quality_id');
    }

    public function threshold(): BelongsTo
    {
        return $this->belongsTo(Threshold::class, 'gas_type', 'gas_type');
    }
    
}