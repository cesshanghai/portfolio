import { techIcon } from '@/lib/icons';

// "Laravel, React" -> small pills (with a logo when we know the tool)
export default function TechTags({ stack }) {
    const tags = stack.split(',').map((t) => t.trim()).filter(Boolean);

    return (
        <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => {
                const icon = techIcon(tag);
                return (
                    <li key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-[5px] text-xs font-semibold">
                        {icon && <img src={icon} alt="" width="14" height="14" loading="lazy" className="size-3.5" />}
                        {tag}
                    </li>
                );
            })}
        </ul>
    );
}
