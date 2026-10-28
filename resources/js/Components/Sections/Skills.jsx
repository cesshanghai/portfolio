import { useState } from 'react';
import SectionTitle from '@/Components/SectionTitle';
import SkillCard from '@/Components/SkillCard';
import OwnerToggle from '@/Components/OwnerToggle';
import { skillGroups, softSkills, people, ownerStyle } from '@/data/people';

export default function Skills() {
    const [who, setWho] = useState('all'); // 'all' | 'claire' | 'mariz'

    // keep only the entries that belong to the chosen person, then drop skills nobody has
    const groups = skillGroups
        .map((g) => ({
            title: g.title,
            items: g.items
                .map((s) => ({ skill: s, entries: s.entries.filter((e) => who === 'all' || e.owner === who) }))
                .filter((x) => x.entries.length > 0),
        }))
        .filter((g) => g.items.length > 0);

    const soft = softSkills.filter((s) => who === 'all' || s.owners.includes(who));

    return (
        <section id="skills" aria-labelledby="skills-title" className="scroll-mt-[72px]">
            <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-8 md:py-[90px]">
                <SectionTitle id="skills-title">Skills</SectionTitle>
                <p className="mt-8 max-w-[760px] text-[17px] leading-7 text-muted">
                    We don't use percentages because we can't honestly measure ourselves that way. Each skill has one of three levels:{' '}
                    <strong className="text-ink">Comfortable</strong> means we can build it without a tutorial,{' '}
                    <strong className="text-ink">Practicing</strong> means we can build it but still look things up, and{' '}
                    <strong className="text-ink">Exploring</strong> means we're still following along and learning.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <OwnerToggle value={who} onChange={setWho} label="Show skills of" />
                    <p className="flex items-center gap-4 text-sm text-muted">
                        <span className="flex items-center gap-1.5"><span aria-hidden="true" className="size-3 rounded-full bg-claire"></span>Claire</span>
                        <span className="flex items-center gap-1.5"><span aria-hidden="true" className="size-3 rounded-full bg-mariz"></span>Mariz</span>
                    </p>
                </div>

                {groups.map((group) => (
                    <div key={group.title} className="mt-12">
                        <h3 className="text-2xl font-bold">{group.title}</h3>
                        <ul className="mt-[18px] grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
                            {group.items.map(({ skill, entries }) => (
                                <SkillCard key={skill.name} skill={skill} entries={entries} showOwner={who === 'all'} />
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="mt-12">
                    <h3 className="text-2xl font-bold">Soft skills</h3>
                    <ul className="mt-4 flex flex-wrap gap-3">
                        {soft.map((s) => (
                            <li key={s.name} data-owner={s.owners.length === 1 ? s.owners[0] : undefined} className="soft-skill gap-2.5 rounded-full border border-line bg-surface px-[23px] py-3 text-[15px] font-semibold">
                                <span className="flex gap-1" aria-hidden="true">
                                    {s.owners.map((o) => <span key={o} className={'size-2.5 rounded-full ' + ownerStyle[o].dot}></span>)}
                                </span>
                                {s.name}
                                <span className="sr-only"> ({s.owners.map((o) => people[o].firstName).join(' and ')})</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
