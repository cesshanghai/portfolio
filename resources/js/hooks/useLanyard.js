import { useEffect, useRef } from 'react';

const SPRING = 0.006;   // how hard it is pulled back to hanging straight
const FRICTION = 0.985; // closer to 1 = swings for longer
const MAX_ANGLE = 35;   // never swing further than this many degrees

/* The swinging, holographic ID card (ported from section 7 of the old main.js).
   Attach wrapRef / lanyardRef / cardRef to the three elements. The card swings
   once when it mounts, so `firstSwing` is how hard that first push is.
   `onTap` runs when the card is clicked (not dragged) or Enter/Space is pressed:
   IdCard uses it to flip the card between the two of us. */
export default function useLanyard(firstSwing = 0.9, onTap) {
    const wrapRef = useRef(null);
    const lanyardRef = useRef(null);
    const cardRef = useRef(null);
    const tapRef = useRef(onTap);
    tapRef.current = onTap; // always the latest function, even though the effect below runs once

    useEffect(() => {
        const wrap = wrapRef.current;
        const lanyard = lanyardRef.current;
        const card = cardRef.current;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let angle = 0;
        let velocity = 0;
        let dragging = false;
        let moved = false;
        let pendingTap = false; // only used when the visitor prefers reduced motion
        let frameId = null;
        let hoverX = 50;
        let hoverY = 50;

        // The CSS reads these variables to place the shine
        const updateHolo = () => {
            card.style.setProperty('--holo-x', hoverX - angle * 1.6 + '%');
            card.style.setProperty('--holo-y', hoverY + '%');
            card.style.setProperty('--glare-x', hoverX - angle * 1.2 + '%');
            card.style.setProperty('--glare-y', hoverY + '%');
        };

        const draw = () => {
            lanyard.style.transform = 'rotate(' + angle + 'deg)';
            updateHolo();
        };

        // One frame: spring + friction, redraw, stop when settled
        const tick = () => {
            if (!dragging) {
                velocity += -SPRING * angle;
                velocity *= FRICTION;
                angle += velocity;
            }
            draw();
            if (!dragging && Math.abs(angle) < 0.05 && Math.abs(velocity) < 0.05) {
                angle = 0;
                velocity = 0;
                draw();
                frameId = null;
                return;
            }
            frameId = requestAnimationFrame(tick);
        };

        const start = () => {
            if (frameId === null) frameId = requestAnimationFrame(tick);
        };

        const nudge = (amount) => {
            if (reduceMotion) return;
            velocity += amount;
            start();
        };

        const onHover = (e) => {
            const box = card.getBoundingClientRect();
            hoverX = Math.max(0, Math.min(100, ((e.clientX - box.left) / box.width) * 100));
            hoverY = Math.max(0, Math.min(100, ((e.clientY - box.top) / box.height) * 100));
            updateHolo();
        };
        const onLeave = () => {
            hoverX = 50;
            hoverY = 50;
            updateHolo();
        };

        const onDown = (e) => {
            if (reduceMotion) {
                pendingTap = true; // no drag or swing, but a click should still flip
                return;
            }
            dragging = true;
            moved = false;
            lanyard.setPointerCapture(e.pointerId);
            lanyard.classList.add('cursor-grabbing');
            start();
        };
        const onMove = (e) => {
            if (!dragging) return;
            moved = true;
            // angle from the pivot (top-centre of the wrapper) to the pointer, like a clock hand
            const box = wrap.getBoundingClientRect();
            const dx = e.clientX - (box.left + box.width / 2);
            const dy = Math.max(e.clientY - box.top, 40);
            const degrees = -Math.atan2(dx, dy) * (180 / Math.PI);
            angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, degrees));
            velocity = 0;
        };
        const release = () => {
            if (pendingTap) {
                pendingTap = false;
                tapRef.current?.();
                return;
            }
            if (!dragging) return;
            dragging = false;
            lanyard.classList.remove('cursor-grabbing');
            if (!moved) {
                tapRef.current?.(); // a plain click flips the card...
                nudge(1.2);         // ...and gives it a little swing
            }
            start();
        };
        const onKey = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tapRef.current?.();
                nudge(1.4);
            }
        };

        card.addEventListener('pointermove', onHover);
        card.addEventListener('pointerleave', onLeave);
        lanyard.addEventListener('pointerdown', onDown);
        lanyard.addEventListener('pointermove', onMove);
        lanyard.addEventListener('pointerup', release);
        lanyard.addEventListener('pointercancel', release);
        lanyard.addEventListener('keydown', onKey);

        updateHolo();
        nudge(firstSwing);

        return () => {
            if (frameId !== null) cancelAnimationFrame(frameId);
            card.removeEventListener('pointermove', onHover);
            card.removeEventListener('pointerleave', onLeave);
            lanyard.removeEventListener('pointerdown', onDown);
            lanyard.removeEventListener('pointermove', onMove);
            lanyard.removeEventListener('pointerup', release);
            lanyard.removeEventListener('pointercancel', release);
            lanyard.removeEventListener('keydown', onKey);
        };
    }, []);

    return { wrapRef, lanyardRef, cardRef };
}
