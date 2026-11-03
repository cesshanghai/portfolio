<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $email    = config('admin.email');
        $password = config('admin.password');

        if (! $email || ! $password) {
            $this->command?->error('Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env first, then run the seeder again.');
            return;
        }

        // Login for the management pages (credentials come from .env)
        User::firstOrCreate(
            ['email' => $email],
            [
                'name'              => 'Admin',
                'password'          => bcrypt($password),
                'email_verified_at' => now(),
            ]
        );

        $this->call(ProjectSeeder::class);
    }
}
