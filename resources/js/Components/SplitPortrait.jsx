import { useEffect, useRef, useState } from 'react';

/* One round photo that shows ONE person at a time, controlled by the mouse
   while it is anywhere inside the About section:
     mouse on the LEFT half of the section  -> Mariz
     mouse on the RIGHT half of the section -> Claire
   When the mouse leaves the About section it goes back to Claire.
   Touch: tap the photo (left half = Mariz, right half = Claire).
   Keyboard: focus the photo, then Left / Right arrow keys. */
export default function SplitPortrait({ claire, mariz }) {
    const [side, setSide] = useState('claire'); // 'claire' | 'mariz'
    const figureRef = useRef(null);

    // Listen on the whole About <section> (the nearest <section> around this component),
    // so it works wherever the mouse is inside About, but nowhere else on the page
    useEffect(() => {
        const section = figureRef.current?.closest('section');
        if (!section) return;

        const onMove = (e) => {
            if (e.pointerType !== 'mouse') return; // phones have no hover
            const box = section.getBoundingClientRect();
            setSide(e.clientX - box.left < box.width / 2 ? 'mariz' : 'claire');
        };
        const onLeave = (e) => {
            if (e.pointerType === 'mouse') setSide('claire');
        };

        section.addEventListener('pointermove', onMove);
        section.addEventListener('pointerleave', onLeave);
        return () => {
            section.removeEventListener('pointermove', onMove);
            section.removeEventListener('pointerleave', onLeave);
        };
    }, []);

    // Tap on the photo itself (touch screens)
    const tap = (e) => {
        if (e.pointerType === 'mouse') return;
        const box = e.currentTarget.getBoundingClientRect();
        setSide(e.clientX - box.left < box.width / 2 ? 'mariz' : 'claire');
    };

    const onKey = (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); setSide('mariz'); }
        if (e.key === 'ArrowRight') { e.preventDefault(); setSide('claire'); }
    };

    const list = [
        { person: claire, active: side === 'claire' },
        { person: mariz, active: side === 'mariz' },
    ];
    const label = side === 'claire' ? claire.firstName : mariz.firstName;

    return (
        <figure ref={figureRef} className="mx-auto lg:mx-0">
            <div
                tabIndex={0}
                role="group"
                aria-label="Photos of Claire and Mariz. Move the mouse to the left or right side of this section, tap the photo, or use the left and right arrow keys to switch."
                onPointerDown={tap}
                onKeyDown={onKey}
                className="relative size-[300px] select-none overflow-hidden rounded-full border border-line bg-[#0a0a0a]"
            >
                {/* both photos sit on top of each other; only the active one is visible */}
                {list.map(({ person, active }) => (
                    <img
                        key={person.key}
                        src={'/' + person.photo}
                        alt={active ? person.photoAlt : ''}
                        aria-hidden={!active}
                        width="600"
                        height="600"
                        loading="lazy"
                        draggable="false"
                        className={'absolute inset-0 size-full object-cover transition-opacity duration-300 motion-reduce:transition-none ' + (active ? 'opacity-100' : 'opacity-0')}
                    />
                ))}
            </div>

            {/* Mariz on the left, Claire on the right, matching the side of the section */}
            <figcaption className="mt-3 flex justify-between px-6 text-sm font-semibold" aria-live="polite">
                <span className={'text-mariz transition-opacity ' + (side === 'mariz' ? 'underline underline-offset-4' : 'opacity-50')}>{mariz.firstName}</span>
                <span className="sr-only">Showing {label}</span>
                <span className={'text-claire transition-opacity ' + (side === 'claire' ? 'underline underline-offset-4' : 'opacity-50')}>{claire.firstName}</span>
            </figcaption>
            <p className="mt-1 hidden text-center text-xs text-muted [@media(hover:hover)]:block">Move your mouse to the left or right side of this section</p>
        </figure>
    );
}