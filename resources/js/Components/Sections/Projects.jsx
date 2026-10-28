import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import SectionTitle from '@/Components/SectionTitle';
import ProjectCard from '@/Components/ProjectCard';
import ProjectDialog from '@/Components/ProjectDialog';
import OwnerToggle from '@/Components/OwnerToggle';


// The only section that is dynamic: `projects` comes from the database.
export default function Projects({ projects }) {
    const { user } = usePage().props.auth; // null when nobody is logged in
    const [who, setWho] = useState('claire');    // 'claire' | 'mariz' (no joint projects, so no "Both")
    const [selected, setSelected] = useState(null);

    const shown = projects.filter((p) => p.owner === who);

    return (
        <section id="projects" aria-labelledby="projects-title" className="scroll-mt-[72px]">
            <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-8 md:py-[90px]">
                <SectionTitle id="projects-title" subtitle="Explore our projects and the tools we used to create them.">Projects</SectionTitle>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <OwnerToggle value={who} onChange={setWho} label="Show projects of" includeAll={false} />

                    {/* Only the logged-in owner sees these. Visitors just see the projects. */}
                    {user && (
                        <div className="flex gap-2">
                            <Link href={route('projects.index')} className="rounded-full border border-brand-text px-[18px] py-2.5 text-sm font-semibold hover:bg-brand/15">Manage projects</Link>
                            <Link href={route('projects.create')} className="rounded-full bg-brand px-[18px] py-2.5 text-sm font-bold text-white hover:brightness-110">Add project</Link>
                        </div>
                    )}
                </div>

                {shown.length === 0 ? (
                    <p className="mt-[30px] rounded-[22px] border border-dashed border-line bg-surface p-10 text-center text-muted">No projects here yet.</p>
                ) : (
                    <div className="mt-[30px] grid gap-[18px] md:grid-cols-2">
                        {shown.map((p) => <ProjectCard key={p.id} project={p} onOpen={setSelected} />)}
                    </div>
                )}
            </div>

            <ProjectDialog project={selected} onClose={() => setSelected(null)} />
        </section>
    );
}
