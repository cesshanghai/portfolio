import { Link, usePage } from '@inertiajs/react';
import { shared } from '@/data/people';

export default function Footer() {
    const { user } = usePage().props.auth;

    return (
        <footer className="border-t border-line">
            <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-1.5 px-6 py-6 text-center text-sm text-muted md:px-8">
                <p>© 2026 {shared.names} · <Link href={user ? route('projects.index') : route('login')} className="underline hover:text-ink">{user ? 'Manage projects' : 'Admin login'}</Link></p>
                <p>
                    Credits: tech icons by{' '}
                    <a href="https://devicon.dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">Devicon</a> (MIT), UI icons from{' '}
                    <a href="https://heroicons.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">Heroicons</a> (MIT), font Inter via Google Fonts. Photos and screenshots are our own.
                </p>
            </div>
        </footer>
    );
}
