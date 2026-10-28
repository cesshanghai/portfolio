import { Head, Link, usePage } from '@inertiajs/react';
import Flash from '@/Components/Flash';

// Shell for the management pages (same dark theme as the public site)
export default function AdminLayout({ title, heading, actions, children }) {
    const { user } = usePage().props.auth;

    return (
        <div className="min-h-screen bg-page font-sans text-ink antialiased">
            <Head title={title} />

            <header className="border-b border-line">
                <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-6 py-4 md:px-8">
                    <Link href={route('projects.index')} className="text-lg font-bold">Portfolio <span className="font-normal text-muted">/ manage</span></Link>
                    <nav aria-label="Admin" className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                        <Link href={route('portfolio')} className="text-muted hover:text-ink">View site</Link>
                        <span className="text-muted">{user?.name}</span>
                        <Link href={route('logout')} method="post" as="button" className="rounded-full border border-line px-4 py-2 hover:border-brand-text">Log out</Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-8">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold">{heading}</h1>
                    {actions}
                </div>
                <Flash />
                {children}
            </main>
        </div>
    );
}
