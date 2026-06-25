<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'System Administrator',
            'email' => 'admin@airquality.com',
            'password' => Hash::make('password123'), 
            'role' => 'admin',
        ]);

           User::create([
            'name' => 'Environment Manager',
            'email' => 'env.manager@airquality.com',
            'password' => Hash::make('password123'),
            'role' => 'environment_manager',
        ]);
    }
}