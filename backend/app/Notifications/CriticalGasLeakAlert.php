<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CriticalGasLeakAlert extends Notification
{
    use Queueable;

    protected $alert;

    public function __construct($alert)
    {
        $this->alert = $alert;
    }

    public function via($notifiable): array
    {
        return ['mail']; 
    }

    public function toMail($notifiable): MailMessage
    {
        // Pull details from the associated AirQuality record
        $airQuality = $this->alert->airQuality ?? \App\Models\AirQuality::find($this->alert->air_quality_id);

        $gasType = $airQuality ? $airQuality->gas_type : 'Unknown Gas';
        $concentration = $airQuality ? $airQuality->concentration_value : 'N/A';
        $windDir = $airQuality ? $airQuality->wind_direction : 'towards_city';

        return (new MailMessage)
            ->error() 
            ->subject('⚠️ CRITICAL PERIMETER BREACH: ' . $gasType . ' Leak Detected!')
            ->greeting('Attention Safety Officer,')
            ->line('An automated air quality sensor node has reported a toxic emission level breach.')
            ->line('Gas Type: ' . $gasType)
            ->line('Recorded Peak: ' . $concentration . ' ppm')
            ->line('Vector Path: Wind moving toward [' . $windDir . ']')
            
            // 🚀 REDIRECT LINK: Forces the browser straight to your React dev server alerts room
            ->action('Open Active Alerts Room', url('http://localhost:5173/dashboard?view=alerts'))
            
            ->line('Immediate acknowledgment and field containment mitigation authorization protocols are requested.');
    }
}