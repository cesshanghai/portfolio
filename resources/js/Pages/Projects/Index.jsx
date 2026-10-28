import { useEffect, useRef, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmDialog from '@/Components/ConfirmDialog';

export default function Index({ projects, filters, owners }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [owner, setOwner] = useState(filters.owner ?? '');
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const first = useRef(true);

    // Search / filter: wait 300 ms after typing, then ask Laravel for the matching rows
    useEffect(() => {
        if (first.current) { first.current = false; return; }
        const timer = setTimeout(() => {
            router.get(route('projects.index'), { search, owner }, { preserveState: true, replace: true });
        }, 300);
        return () => clearTimeout(timer);
    }, [search, owner]);

    const confirmDelete = () => {
        router.delete(route('projects.destroy', toDelete.id), {
            preserveScroll: true,
            onStart: () => setDeleting(true),
            onFinish: () => { setDeleting(false); setToDelete(null); },
        });
    };

    const addButton = (
        <Link href={route('projects.create')} className="rounded-full bg-brand px-6 py-3 font-bold text-white shadow-[0_6px_8px_rgba(199,18,64,0.35)] hover:brightness-110">Add project</Link>
    );

    return (
        <AdminLayout title="Projects" heading="Projects" actions={addButton}>
            <div className="mb-5 flex flex-wrap gap-3">
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title" aria-label="Search by title" className="h-[46px] w-full max-w-xs rounded-xl border border-line bg-surface px-4 placeholder:text-muted" />
                <select value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Filter by owner" className="h-[46px] rounded-xl border border-line bg-surface px-4">
                    <option value="">Everyone</option>
                    {Object.entries(owners).map(([key, name]) => <option key={key} value={key}>{name}</option>)}
                </select>
            </div>

            {projects.data.length === 0 ? (
                <p className="rounded-[22px] border border-dashed border-line bg-surface p-10 text-center text-muted">No projects found. Use “Add project” to create one.</p>
            ) : (
                <div className="overflow-x-auto rounded-[22px] border border-line bg-surface">
                    <table className="w-full min-w-[640px] text-left">
                        <thead className="border-b border-line text-sm text-muted">
                            <tr>
                                <th scope="col" className="px-5 py-3 font-semibold">Project</th>
                                <th scope="col" className="px-5 py-3 font-semibold">Belongs to</th>
                                <th scope="col" className="px-5 py-3 font-semibold">Completed</th>
                                <th scope="col" className="px-5 py-3 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.data.map((p) => (
                                <tr key={p.id} className="border-b border-line last:border-0">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                                                {p.image_url && <img src={p.image_url} alt="" className="size-full object-cover" />}
                                            </div>
                                            <div>
                                                <p className="font-bold">{p.title}</p>
                                                <p className="text-sm text-muted">{p.tech_stack}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">{owners[p.owner] ?? p.owner}</td>
                                    <td className="px-5 py-4">{p.date_completed}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Link href={route('projects.edit', p.id)} className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:border-brand-text">Edit<span className="sr-only"> {p.title}</span></Link>
                                            <button type="button" onClick={() => setToDelete(p)} className="rounded-full border border-brand-text px-4 py-2 text-sm font-semibold text-brand-text hover:bg-brand/15">Delete<span className="sr-only"> {p.title}</span></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {projects.last_page > 1 && (
                <nav aria-label="Pagination" className="mt-6 flex flex-wrap gap-2">
                    {projects.links.map((link, i) => {
                        // Laravel sends labels like "&laquo; Previous": show plain text instead
                        const label = link.label.replace('&laquo; ', '← ').replace(' &raquo;', ' →');
                        const base = 'rounded-lg border px-3.5 py-2 text-sm font-semibold ';
                        return link.url ? (
                            <Link key={i} href={link.url} preserveScroll aria-current={link.active ? 'page' : undefined} className={base + (link.active ? 'border-brand bg-brand text-white' : 'border-line hover:border-brand-text')}>{label}</Link>
                        ) : (
                            <span key={i} className={base + 'border-line text-muted opacity-60'}>{label}</span>
                        );
                    })}
                </nav>
            )}

            <ConfirmDialog
                open={!!toDelete}
                title="Delete this project?"
                message={toDelete ? `“${toDelete.title}” will be removed from the database and from the public portfolio. This cannot be undone.` : ''}
                processing={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setToDelete(null)}
            />
        </AdminLayout>
    );
}
