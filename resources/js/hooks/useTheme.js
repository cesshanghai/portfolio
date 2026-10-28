import { useState } from 'react';

// Dark / light toggle. The <html class="dark"> switch is what changes the palette.
export default function useTheme() {
    const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

    const toggle = () => {
        const next = !dark;
        document.documentElement.classList.toggle('dark', next);
        setDark(next);
        try {
            localStorage.setItem('theme', next ? 'dark' : 'light');
        } catch (e) {
            // storage blocked: the theme still changes, it just is not remembered
        }
    };

    return { dark, toggle };
}
