import { people, peopleList } from '@/data/people';

/* "Both / Claire / Mariz" buttons. Used by Skills and Projects.
   Pass includeAll={false} to hide "Both" (Projects does, since we have no joint project).
   `value` is 'all' or an owner key; `onChange` gets the new value. */
export default function OwnerToggle({ value, onChange, label, includeAll = true }) {
    const owners = peopleList.map((p) => [p.key, people[p.key].firstName]);
    const options = includeAll ? [['all', 'Both'], ...owners] : owners;

    return (
        <div role="group" aria-label={label} className="flex rounded-full border border-line bg-surface p-1">
            {options.map(([key, text]) => (
                <button
                    key={key}
                    type="button"
                    aria-pressed={value === key}
                    onClick={() => onChange(key)}
                    className={'rounded-full px-4 py-2 text-sm font-semibold text-muted hover:text-ink aria-pressed:text-white ' + (key === 'mariz' ? 'aria-pressed:bg-mariz-solid' : 'aria-pressed:bg-brand')}
                >
                    {text}
                </button>
            ))}
        </div>
    );
}
