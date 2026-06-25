<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Http\Controllers\SimulatorController;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');






Schedule::call(function () {
    $chance = rand(1, 100);
    
    // If the number is 15 or less (15% probability)
    if ($chance <= 15) {
        $mode = 'critical';
    } else {
        $mode = 'normal';
    }

    // to use function inside this controller  i need to create instance from it.
    (new SimulatorController)->generateDynamicData($mode);
})->everyMinute();
