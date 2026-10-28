import SectionTitle from '@/Components/SectionTitle';
import ContactForm from '@/Components/ContactForm';
import { ICON_PATHS } from '@/Components/Sections/ContactIcons';
import { peopleList, ownerStyle } from '@/data/people';

function Icon({ name, owner }) {
    const filled = name === 'github';
    return (
        <span className={ownerStyle[owner].text}>
            <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
                <path d={ICON_PATHS[name]} />
            </svg>
        </span>
    );
}

// One card per person
function ContactCard({ person }) {
    const c = person.contact;
    return (
        <div className={'rounded-[20px] border border-t-4 bg-surface p-6 ' + ownerStyle[person.key].border}>
            <h3 className={'text-xl font-bold ' + ownerStyle[person.key].text}>{person.fullName}</h3>
            <ul className="mt-5 flex flex-col gap-4">
                <li className="flex items-center gap-3.5"><Icon name="school" owner={person.key} />{c.school}</li>
                <li className="flex items-center gap-3.5"><Icon name="email" owner={person.key} /><a href={'mailto:' + c.email} className="break-all hover:underline">{c.email}</a></li>
                <li className="flex items-center gap-3.5"><Icon name="location" owner={person.key} />{c.location}</li>
                <li className="flex items-center gap-3.5">
                    <Icon name="github" owner={person.key} />
                    <a href={c.github} target="_blank" rel="noopener noreferrer" className="break-all hover:underline">{c.githubLabel}<span className="sr-only"> (opens in a new tab)</span></a>
                </li>
            </ul>
        </div>
    );
}

export default function Contact() {
    return (
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-[72px]">
            <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-8 md:py-[90px]">
                <SectionTitle id="contact-title">Contact us</SectionTitle>

                <div className="mt-9 grid gap-12 lg:grid-cols-[minmax(0,616px)_minmax(0,430px)]">
                    <ContactForm />

                    <div className="flex flex-col gap-5">
                        {peopleList.map((p) => <ContactCard key={p.key} person={p} />)}
                    </div>
                </div>
            </div>
        </section>
    );
}
