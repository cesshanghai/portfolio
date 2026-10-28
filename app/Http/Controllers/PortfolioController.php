<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    // One shared page for both owners: send EVERY project and let React filter
    // them with the Both / Claire / Mariz toggle (no extra request needed).
    public function index()
    {
        return Inertia::render('Portfolio', [
            'projects' => Project::orderByDesc('date_completed')->get(),
            'owners'   => Project::OWNERS,
        ]);
    }
}
