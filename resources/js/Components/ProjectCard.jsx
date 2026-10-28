import TechTags from '@/Components/TechTags';
import OwnerBadge from '@/Components/OwnerBadge';

export default function ProjectCard({ project, onOpen }) {
    return (
        <article data-project data-owner={project.owner} className="flex flex-col overflow-hidden rounded-[22px] border border-line bg-surface pb-6">
            <div className="aspect-[541/340] overflow-hidden bg-surface-2">
                {project.image_url ? (
                    <img src={project.image_url} alt={'Preview of ' + project.title} width="1082" height="680" loading="lazy" className="size-full object-cover" />
                ) : (
                    <div className="flex size-full items-center justify-center text-5xl font-bold text-muted" aria-hidden="true">{project.title.charAt(0)}</div>
                )}
            </div>
            <div className="flex flex-1 flex-col items-start gap-3 px-6 pt-5">
                <OwnerBadge owner={project.owner} />
                <h3 className="text-[22px] font-bold">{project.title}</h3>
                <p className="text-base leading-[26px] text-muted">{project.description}</p>
                <TechTags stack={project.tech_stack} />
                <button type="button" onClick={() => onOpen(project)} className={'mt-auto rounded-full px-[22px] py-3.5 text-sm font-bold text-white hover:brightness-110 ' + (project.owner === 'mariz' ? 'bg-mariz-solid shadow-[0_6px_8px_rgba(109,63,209,0.35)]' : 'bg-brand shadow-[0_6px_8px_rgba(199,18,64,0.35)]')}>
                    View details<span className="sr-only"> of {project.title}</span>
                </button>
            </div>
        </article>
    );
}
