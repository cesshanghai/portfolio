import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

// Shows the "success" message Laravel flashed (see HandleInertiaRequests::share)
export default function Flash() {
    const message = usePage().props.flash?.success;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4500);
        return () => clearTimeout(timer);
    }, [message]);

    if (!message || !visible) return null;

    return (
        <div role="status" className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-ok bg-surface px-5 py-4 font-semibold text-ok">
            <span>{message}</span>
            <button type="button" onClick={() => setVisible(false)} aria-label="Dismiss message" className="text-xl leading-none">×</button>
        </div>
    );
}
