import SectionTitle from '@/Components/SectionTitle';
import { peopleList, ownerStyle } from '@/data/people';

// Two timelines side by side (stacked on a phone), one per person
export default function Education() {
    return (
        <section id="education" aria-labelledby="education-title" className="scroll-mt-[72px]">
            <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-8 md:py-[90px]">
                <SectionTitle id="education-title">Education and experience</SectionTitle>

                <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-12">
                    {peopleList.map((p) => (
                        <div key={p.key}>
                            <h3 className={'text-2xl font-bold ' + ownerStyle[p.key].text}>{p.fullName}</h3>
                            <ol className="mt-8 max-w-[734px]">
                                {p.education.map((item) => (
                                    <li key={item.title} className="group relative pb-9 pl-11 last:pb-0">
                                        <span aria-hidden="true" className={'absolute left-0 top-0.5 size-[22px] rounded-full border-[3px] bg-page ' + ownerStyle[p.key].border}></span>
                                        <span aria-hidden="true" className="absolute bottom-0 left-[10px] top-[30px] w-0.5 bg-line group-last:hidden"></span>
                                        <h4 className="text-xl font-bold">{item.title}</h4>
                                        <p className={'mt-1.5 text-[15px] font-semibold ' + ownerStyle[p.key].text}>{item.period}</p>
                                        <p className="mt-1.5 text-[17px] leading-[26px] text-muted">
                                            {item.lines.map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
