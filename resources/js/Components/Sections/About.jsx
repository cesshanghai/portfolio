import SectionTitle from '@/Components/SectionTitle';
import SplitPortrait from '@/Components/SplitPortrait';
import { people, peopleList, ownerStyle, shared, toolCount } from '@/data/people';

function Stat({ label, value }) {
    return (
        <div className="flex flex-col-reverse gap-1.5 rounded-[20px] border border-line bg-surface px-[30px] py-7">
            <dt className="text-[17px] text-muted">{label}</dt>
            <dd className="text-[46px] font-bold leading-none">{value}</dd>
        </div>
    );
}

export default function About({ projectCount }) {
    return (
        <section id="about" aria-labelledby="about-title" className="scroll-mt-[72px]">
            <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-8 md:py-[100px]">
                <div className="grid items-start gap-10 lg:grid-cols-[300px_1fr] lg:gap-[50px]">
                    <SplitPortrait claire={people.claire} mariz={people.mariz} />

                    <div className="flex max-w-[760px] flex-col gap-[22px]">
                        <SectionTitle id="about-title">About us</SectionTitle>

                        {peopleList.map((p) => (
                            <div key={p.key} className={'flex flex-col gap-3 border-l-4 pl-5 ' + ownerStyle[p.key].border}>
                                <h3 className={'text-[22px] font-bold ' + ownerStyle[p.key].text}>{p.fullName}</h3>
                                {p.about.map((text) => <p key={text} className="text-lg leading-8">{text}</p>)}
                            </div>
                        ))}

                        <h3 className="text-[26px] font-bold">What we're aiming for</h3>
                        <ul className="flex flex-col gap-3.5">
                            {peopleList.flatMap((p) => p.goals.map((g) => (
                                <li key={p.key + g} className="flex gap-3.5 text-lg leading-[30px]">
                                    <span aria-hidden="true" className={'mt-2.5 size-2.5 shrink-0 rounded-full ' + ownerStyle[p.key].dot}></span>
                                    <span><span className="sr-only">{p.firstName}: </span>{g}</span>
                                </li>
                            )))}
                        </ul>
                    </div>
                </div>

                {/* project count comes from the database, the other numbers from people.js */}
                <dl className="mt-14 grid gap-5 sm:grid-cols-3">
                    <Stat label="projects on this page" value={projectCount} />
                    <Stat label="tools and languages" value={toolCount} />
                    <Stat label="years studying IT" value={shared.yearsStudying} />
                </dl>
            </div>
        </section>
    );
}
