import IdCard from '@/Components/IdCard';
import { people, shared, heroTech } from '@/data/people';

export default function Hero({ swing }) {
    return (
        <section id="home" aria-labelledby="hero-title" className="scroll-mt-[72px]">
            <div className="mx-auto grid max-w-[1100px] gap-10 px-6 pb-16 md:px-8 lg:min-h-[820px] lg:grid-cols-[1fr_340px] lg:gap-8 lg:pb-0">
                <div className="flex flex-col items-start gap-[22px] pt-12 lg:self-center lg:pt-0">
                    <p className="rounded-full border border-line bg-surface px-5 py-2.5 text-[15px] font-semibold">{shared.badge}</p>
                    <p className="text-lg text-muted">{shared.school}</p>

                    <h1 id="hero-title" className="text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-6xl xl:text-[72px] xl:leading-[76px]">
                        <span className="text-claire">{shared.heroName[0]}</span>
                        <span className="block text-mariz">{shared.heroName[1]}</span>
                    </h1>

                    <p className="max-w-[640px] text-lg leading-8 text-muted lg:text-xl lg:leading-[35px]">{shared.intro}</p>

                    <ul className="flex flex-wrap gap-2.5" aria-label="Technologies we use">
                        {heroTech.map((t) => (
                            <li key={t.name} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-2 pl-2.5 pr-3.5 text-[15px] font-semibold">
                                <img src={t.icon} alt="" width="20" height="20" className="size-5" />{t.name}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-4">
                        <a href="#projects" className="home-cta rounded-full border border-line bg-surface px-8 py-4 text-lg font-bold hover:border-brand-text sm:px-[34px] sm:py-5">View our Projects</a>
                        <a href="#contact" className="home-cta rounded-full border border-line bg-surface px-8 py-4 text-lg font-bold hover:border-brand-text sm:px-[34px] sm:py-5">Contact us</a>
                    </div>
                </div>

                <IdCard claire={people.claire} mariz={people.mariz} firstSwing={swing} />
            </div>
        </section>
    );
}
