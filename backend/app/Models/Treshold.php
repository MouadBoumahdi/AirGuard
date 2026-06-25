<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Threshold extends Model
{
    protected $table = 'thresholds';

    protected $fillable = ['gas_type', 'max_allowed_limit', 'severity_level'];

    public function airQualities(): HasMany
    {
        return $this->hasMany(AirQuality::class, 'gas_type', 'gas_type');
    }
}