<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    // key => display name. The keys must match resources/js/data/people.js.
    public const OWNERS = [
        'claire' => 'Princess Claire',
        'mariz' => 'Mariz Iglesias',
    ];


    // The choices shown in the Tech stack dropdown (also the only values validation accepts).
    // Need another tool? Add its name here.
    public const TECH = [
    'HTML5', 'CSS', 'Tailwind CSS', 'Bootstrap', 'JavaScript', 'React', 'PHP', 'Laravel',
    'MySQL', 'Python', 'Java', 'C++', 'Git', 'GitHub', 'Figma', 'Canva', 'Photoshop',
    'Blender', 'SketchUp', 'Flutter', 'Dart',
];

    // Only these columns can be filled through create() / update() (mass assignment protection)
    protected $fillable = [
        'title',
        'owner',
        'description',
        'tech_stack',
        'project_url',
        'image',
        'date_completed',
    ];

    protected $casts = [
        'date_completed' => 'date:Y-m-d',
    ];

    // Sent to React together with the record
    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        // Seeded images live in public/images, uploaded ones in storage/app/public/projects
        return str_starts_with($this->image, 'images/')
            ? asset($this->image)
            : asset('storage/' . $this->image);
    }
}
