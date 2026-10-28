<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->string('owner', 30)->index();          // which portfolio the project belongs to
            $table->text('description');
            $table->string('tech_stack', 150);              // comma-separated: "Laravel, React"
            $table->string('project_url')->nullable();
            $table->string('image')->nullable();            // path only, never the file itself
            $table->date('date_completed');
            $table->timestamps();

            // Database-level backup for the "unique title per owner" rule
            $table->unique(['owner', 'title']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
