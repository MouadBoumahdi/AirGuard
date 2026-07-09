<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject; // Import JWTSubject

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

  
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

  
    public function getJWTCustomClaims()
    {
        // We include the user's role inside the token payload for easy frontend or backend reading
        return [
            'role' => $this->role
        ];
    }



    /**
 * Route notifications for the mail channel.
 */
public function routeNotificationForMail($notification): string
{
    // 💡 If your table column is named 'email', return $this->email;
    // 💡 If it's something else like 'user_email', change it below:
    return $this->email; 
}
}