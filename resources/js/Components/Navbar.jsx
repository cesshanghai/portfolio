import { useState, useEffect } from 'react';
import { shared } from '@/data/people';

const LINKS = [
    ['home', 'Home'], ['about', 'About'], ['skills', 'Skills'],
    ['projects', 'Projects'], ['education', 'Education'], ['contact', 'Contact'],
];

const linkBase = 'block rounded-lg border-b-2 border-transparent px-[15px] py-2 font-medium text-muted hover:text-ink aria-[current=true]:border-brand-text aria-[current=true]:font-semibold aria-[current=true]:text-ink';
const contactLink = 'ml-1 block rounded-[10px] border border-brand-text px-5 py-2.5 font-semibold hover:bg-brand/15 aria-[current=true]:bg-brand/15';
const mobileLink = 'block rounded-lg px-3 py-3 font-medium text-muted hover:bg-surface hover:text-ink aria-[current=true]:bg-surface aria-[current=true]:text-brand-text';

export default function Navbar({ active, dark, onToggleTheme }) {
    const [open, setOpen] = useState(false);

    // Escape closes the mobile menu
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-page/95 backdrop-blur">
            <nav aria-label="Primary" className="mx-auto flex h-[72px] max-w-[1100px] items-center justify-between gap-3 px-6 md:px-8">
                <a href="#home" className="min-w-0 truncate text-lg font-bold sm:text-xl">
                    {shared.navName}<span className="font-normal text-muted"> / IT</span>
                </a>

                <div className="flex shrink-0 items-center gap-1.5">
                    <ul className="hidden items-center gap-1.5 lg:flex">
                        {LINKS.map(([id, label]) => (
                            <li key={id}>
                                <a href={'#' + id} aria-current={active === id ? 'true' : undefined} className={id === 'contact' ? contactLink : linkBase}>{label}</a>
                            </li>
                        ))}
                    </ul>

                    <button type="button" onClick={onToggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink hover:border-brand-text">
                        {dark ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true"><path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true"><path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
                        )}
                    </button>

                    <button type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)} className="flex size-11 items-center justify-center rounded-lg border border-line bg-surface lg:hidden">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
                    </button>
                </div>
            </nav>

            <div id="mobile-menu" className={'border-t border-line bg-page lg:hidden ' + (open ? '' : 'hidden')}>
                <ul className="mx-auto flex max-w-[1100px] flex-col px-6 py-3 md:px-8">
                    {LINKS.map(([id, label]) => (
                        <li key={id}>
                            <a href={'#' + id} onClick={() => setOpen(false)} aria-current={active === id ? 'true' : undefined} className={mobileLink}>{label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}
