<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Login for the management pages
        User::firstOrCreate(
            ['email' => 'domiglesias@gmail.com'],
            [
                'name'              => 'Admin',
                'password'          => bcrypt('cesszie0617'),   // key stays 'password', the value goes inside bcrypt()
                'email_verified_at' => now(),
            ]
        );

        $this->call(ProjectSeeder::class);
    }
}