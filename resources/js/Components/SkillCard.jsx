import { people, ownerStyle } from '@/data/people';

const DOTS = { Comfortable: 3, Practicing: 2, Exploring: 1 };

// One skill. `entries` has one item per person who has the skill (already filtered by the toggle).
// `showOwner` is true in the "Both" view, so you can tell whose level you are reading.
export default function SkillCard({ skill, entries, showOwner }) {
    return (
        <li data-skill data-owner={entries.length === 1 ? entries[0].owner : undefined} className="flex flex-col gap-[9px] rounded-[20px] border border-line bg-surface p-[22px]">
            <div className="flex items-start justify-between">
                <div className="flex size-[54px] items-center justify-center rounded-xl bg-white">
                    {skill.icon === 'sketchup' ? (
                        <svg viewBox="0 0 32 32" className="size-[30px]" aria-hidden="true">
                            <path d="M16 3 28 9.5v13L16 29 4 22.5v-13z" fill="#d6212b" />
                            <path d="M16 3 28 9.5 16 16 4 9.5z" fill="#f05a5f" />
                            <path d="M16 16v13L4 22.5v-13z" fill="#1e5aa8" />
                        </svg>
                    ) : (
                        <img src={skill.icon} alt="" width="30" height="30" loading="lazy" className="size-[30px]" />
                    )}
                </div>
                {/* coloured dots = who has this skill */}
                <span className="flex gap-1.5" aria-hidden="true">
                    {entries.map((e) => <span key={e.owner} className={'size-3 rounded-full ' + ownerStyle[e.owner].dot}></span>)}
                </span>
            </div>

            <h4 className="text-xl font-bold">{skill.name}</h4>

            <div className="flex flex-col gap-3">
                {entries.map((e) => {
                    const filled = DOTS[e.level] ?? 1;
                    return (
                        <div key={e.owner} className="flex flex-col gap-1">
                            <p className="flex items-center gap-3 text-[15px] font-semibold text-brand-text">
                                {showOwner && <span className={ownerStyle[e.owner].text}>{people[e.owner].firstName}</span>}
                                <span className="flex gap-1" aria-hidden="true">
                                    {[1, 2, 3].map((n) => (
                                        <span key={n} className={'size-2.5 rounded-full ' + (n <= filled ? ownerStyle[e.owner].dot : 'bg-line')}></span>
                                    ))}
                                </span>
                                <span className="text-ink">{e.level}</span>
                            </p>
                            <p className="text-[15px] leading-[23px] text-muted">{e.note}</p>
                        </div>
                    );
                })}
            </div>
        </li>
    );
}
