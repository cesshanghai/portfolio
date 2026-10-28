<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::query()
            ->when($request->search, fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when($request->owner, fn ($q, $o) => $q->where('owner', $o))
            ->orderBy('owner')
            ->orderByDesc('date_completed')
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters'  => $request->only('search', 'owner'),
            'owners'   => Project::OWNERS,
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create', $this->options());
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules($request), $this->messages());

        unset($data['image']);
        $data['tech_stack'] = implode(', ', $data['tech_stack']); // array from the dropdown -> "Laravel, React"
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        Project::create($data);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', ['project' => $project] + $this->options());
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate($this->rules($request, $project), $this->messages());

        unset($data['image']);
        $data['tech_stack'] = implode(', ', $data['tech_stack']);
        if ($request->hasFile('image')) {
            $this->deleteImage($project);
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        $project->update($data);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $this->deleteImage($project);
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted.');
    }

    // ---------------------------------------------------------------

    private function options(): array
    {
        return ['owners' => Project::OWNERS, 'techOptions' => Project::TECH];
    }

    // One rule set for both store and update ($project is only passed on update)
    private function rules(Request $request, ?Project $project = null): array
    {
        return [
            'title' => [
                'required', 'string', 'min:3', 'max:100',
                // same title may exist for another owner, and ignore THIS record when updating
                Rule::unique('projects', 'title')
                    ->where('owner', $request->input('owner'))
                    ->ignore($project?->id),
            ],
            'owner'          => ['required', Rule::in(array_keys(Project::OWNERS))],
            'description'    => ['required', 'string', 'min:20', 'max:500'],
            'tech_stack'     => ['required', 'array', 'min:1', 'max:8'],
            'tech_stack.*'   => ['string', Rule::in(Project::TECH)],
            'project_url'    => ['nullable', 'url', 'max:255'],
            'image'          => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'date_completed' => ['required', 'date', 'before_or_equal:today'],
        ];
    }

    private function messages(): array
    {
        return [
            'title.required'                 => 'Please enter the project title.',
            'title.unique'                   => 'This person already has a project with that title.',
            'owner.in'                       => 'Please choose whose portfolio this belongs to.',
            'description.min'                => 'Please describe the project in at least :min characters.',
            'tech_stack.required'            => 'Pick at least one tool from the list.',
            'tech_stack.min'                 => 'Pick at least one tool from the list.',
            'tech_stack.max'                 => 'Pick at most :max tools.',
            'tech_stack.*.in'                => 'One of the selected tools is not in the list.',
            'project_url.url'                => 'Please enter a full link, like https://example.com.',
            'image.image'                    => 'The file must be an image.',
            'image.mimes'                    => 'Only JPG, PNG or WEBP images are allowed.',
            'image.max'                      => 'The image must not be larger than 2 MB.',
            'date_completed.before_or_equal' => 'The completion date cannot be in the future.',
        ];
    }

    // Only delete files that were uploaded (not the seeded ones in public/images)
    private function deleteImage(Project $project): void
    {
        if ($project->image && ! str_starts_with($project->image, 'images/')) {
            Storage::disk('public')->delete($project->image);
        }
    }
}
