import { useEffect, useRef, useState } from 'react';

/* Dropdown with checkboxes: pick one or many options.
   value = array of selected strings, onChange(newArray). Shows the error under it like FormField. */
export default function MultiSelect({ label, name, options, value, onChange, error, hint, placeholder = 'Select options' }) {
    const [open, setOpen] = useState(false);
    const box = useRef(null);

    // Close when clicking outside or pressing Escape
    useEffect(() => {
        if (!open) return;
        const outside = (e) => box.current && !box.current.contains(e.target) && setOpen(false);
        const esc = (e) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('mousedown', outside);
        document.addEventListener('keydown', esc);
        return () => {
            document.removeEventListener('mousedown', outside);
            document.removeEventListener('keydown', esc);
        };
    }, [open]);

    const toggle = (option) =>
        onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);

    return (
        <div ref={box} className="relative flex flex-col gap-2">
            <label htmlFor={name} className="text-sm font-semibold">{label}</label>

            <button
                id={name}
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-haspopup="true"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? name + '-error' : undefined}
                className="flex min-h-[50px] w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-2 text-left aria-[invalid=true]:border-brand-text"
            >
                <span className="flex flex-wrap gap-1.5">
                    {value.length === 0 ? (
                        <span className="text-muted">{placeholder}</span>
                    ) : (
                        value.map((v) => <span key={v} className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs font-semibold">{v}</span>)
                    )}
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={'size-5 shrink-0 text-muted transition-transform ' + (open ? 'rotate-180' : '')} aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </button>

            {open && (
                <div role="group" aria-label={label} className="absolute left-0 right-0 top-[84px] z-20 max-h-64 overflow-y-auto rounded-xl border border-line bg-surface p-2 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
                    {options.map((option) => (
                        <label key={option} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-surface-2">
                            <input type="checkbox" checked={value.includes(option)} onChange={() => toggle(option)} className="size-4 rounded border-line bg-surface text-brand focus:ring-brand" />
                            <span className="font-medium">{option}</span>
                        </label>
                    ))}
                </div>
            )}

            {hint && !error && <p className="text-sm text-muted">{hint}</p>}
            {error && <p id={name + '-error'} role="alert" className="text-sm font-semibold text-brand-text">{error}</p>}
        </div>
    );
}
