<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            // ---- Princess Claire (from the original portfolio) ----
            ['owner' => 'claire', 'title' => 'DormEase', 'image' => 'images/dormease.png',
             'description' => 'A web and mobile dormitory system with assisted maintenance reports, built for residents and admins.',
             'tech_stack' => 'Laravel, React, Tailwind CSS, MySQL', 'date_completed' => '2026-09-30'],
            ['owner' => 'claire', 'title' => 'Berryella 3D Character', 'image' => 'images/character.png',
             'description' => 'A 3D digital rendering of a pink-haired character set in a vibrant green landscape with strawberry-shaped houses and trees.',
             'tech_stack' => 'Blender', 'date_completed' => '2026-06-15'],
            ['owner' => 'claire', 'title' => 'Car Rental System', 'image' => 'images/car.png',
             'description' => 'A black and yellow user interface displaying large, prominent navigation buttons for "Add Car", "View Car", and "Rent Car".',
             'tech_stack' => 'JavaScript', 'date_completed' => '2026-04-20'],
            ['owner' => 'claire', 'title' => '3D Home Design', 'image' => 'images/house.png',
             'description' => 'A 3D architectural floor plan showing the interior layout of furnished rooms, a garage with a parked car, and an outdoor swimming pool.',
             'tech_stack' => 'SketchUp', 'date_completed' => '2026-03-10'],

            // ---- Mariz: sample rows. Edit or delete them from /projects ----
            ['owner' => 'mariz', 'title' => 'Sample Project One', 'image' => null,
             'description' => 'Replace this sample with Mariz\'s real project using the Edit button.',
             'tech_stack' => 'Laravel, MySQL', 'date_completed' => '2026-08-01'],
            ['owner' => 'mariz', 'title' => 'Sample Project Two', 'image' => null,
             'description' => 'Another placeholder so Mariz\'s filter is not empty. Delete it from the manager.',
             'tech_stack' => 'HTML5, Tailwind CSS', 'date_completed' => '2026-05-12'],
        ];

        foreach ($rows as $row) {
            Project::updateOrCreate(['owner' => $row['owner'], 'title' => $row['title']], $row);
        }
    }
}
