import { useEffect, useRef } from 'react';

// "Are you sure?" step before a record is deleted
export default function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', processing, onConfirm, onCancel }) {
    const ref = useRef(null);

    useEffect(() => {
        const dialog = ref.current;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    return (
        <dialog ref={ref} onClose={onCancel} aria-labelledby="confirm-title" className="m-auto w-[calc(100%-2rem)] max-w-[440px] rounded-[22px] border border-line bg-surface p-6 text-ink backdrop:bg-black/70">
            <h2 id="confirm-title" className="text-xl font-bold">{title}</h2>
            <p className="mt-2 text-muted">{message}</p>
            <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onCancel} className="rounded-full border border-line px-5 py-2.5 font-semibold hover:border-brand-text">Cancel</button>
                <button type="button" onClick={onConfirm} disabled={processing} className="rounded-full bg-brand px-5 py-2.5 font-bold text-white hover:brightness-110 disabled:opacity-60">{confirmLabel}</button>
            </div>
        </dialog>
    );
}
