<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GasSensor extends Model
{
    protected $fillable = ['sensor_name', 'location', 'status', 'last_calibration_date'];

    public function airQualities(): HasMany
    {
        return $this->hasMany(AirQuality::class, 'sensor_id');
    }
}