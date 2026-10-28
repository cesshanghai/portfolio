import { useEffect, useRef } from 'react';
import TechTags from '@/Components/TechTags';
import OwnerBadge from '@/Components/OwnerBadge';

// <dialog> gives us the dark backdrop, focus trap and Escape key for free
export default function ProjectDialog({ project, onClose }) {
    const ref = useRef(null);

    useEffect(() => {
        const dialog = ref.current;
        if (project && !dialog.open) dialog.showModal();
        if (!project && dialog.open) dialog.close();
        document.body.classList.toggle('overflow-hidden', !!project);
        return () => document.body.classList.remove('overflow-hidden');
    }, [project]);

    return (
        <dialog
            ref={ref}
            aria-labelledby="dialog-title"
            onClose={onClose}
            onClick={(e) => e.target === ref.current && onClose()}
            className="m-auto w-[calc(100%-2rem)] max-w-[640px] overflow-hidden rounded-[22px] border border-line bg-surface p-0 text-ink backdrop:bg-black/70"
        >
            {project && (
                <div className="relative max-h-[90vh] overflow-y-auto">
                    <button type="button" onClick={onClose} aria-label="Close project details" className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                    </button>
                    <div className="aspect-[541/340] bg-surface-2">
                        {project.image_url && <img src={project.image_url} alt={'Preview of ' + project.title} className="size-full object-cover" />}
                    </div>
                    <div className="flex flex-col items-start gap-3 p-6">
                        <OwnerBadge owner={project.owner} />
                        <h3 id="dialog-title" className="text-2xl font-bold">{project.title}</h3>
                        <p className="text-base leading-[26px] text-muted">{project.description}</p>
                        <div>
                            <p className="mb-2 text-sm font-semibold">Made with</p>
                            <TechTags stack={project.tech_stack} />
                        </div>
                        {project.project_url && (
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-brand-text px-5 py-2.5 text-sm font-semibold hover:bg-brand/15">
                                Visit project<span className="sr-only"> (opens in a new tab)</span>
                            </a>
                        )}
                    </div>
                </div>
            )}
        </dialog>
    );
}
