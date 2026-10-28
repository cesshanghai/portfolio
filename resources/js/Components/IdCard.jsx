import { useState } from 'react';
import useLanyard from '@/hooks/useLanyard';

// [x, width] of each barcode stripe (copied from the original SVG)
const BARS = [[0, 3], [6, 2], [10, 4], [16, 2], [21, 2], [25, 5], [32, 2], [37, 3], [42, 2], [46, 4], [53, 2], [57, 2], [61, 3], [67, 5], [74, 2], [78, 2], [83, 4], [89, 2], [93, 3], [99, 2], [103, 2], [107, 5], [115, 3], [120, 2], [124, 2], [129, 4], [135, 2], [139, 3], [145, 2], [149, 2], [153, 5], [161, 2], [165, 3], [170, 2], [175, 4], [181, 2], [185, 2], [190, 3], [195, 4], [201, 2]];

// One side of the card. `hidden` hides the side that is turned away from the visitor.
function Face({ person, accent, back, hidden }) {
    const id = person.id;
    const faceClass = 'absolute inset-0 overflow-hidden rounded-[22px] bg-white text-[#111] shadow-[0_16px_40px_rgba(0,0,0,0.4)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]';

    return (
        <div aria-hidden={hidden} className={faceClass} style={back ? { transform: 'rotateY(180deg)' } : undefined}>
            <div className="absolute inset-x-0 top-0 h-[82px] bg-[#12141c] px-[18px] pt-[26px]">
                <p className="text-[12.5px] font-bold leading-none text-white">URDANETA CITY UNIVERSITY</p>
                <p className="mt-[5px] max-w-[200px] text-[9.5px] font-semibold leading-[11px] text-[#d4d4dc]">College of Information and Technology Education</p>
            </div>
            {/* the colour stripe tells you whose side you are looking at */}
            <div className="absolute inset-x-0 top-[82px] h-1.5" style={{ background: accent }}></div>

            <div className="absolute left-[70px] top-[98px] size-[140px] overflow-hidden rounded-xl border-[3px] border-[#ddd] bg-[#d8d8de]">
                <img src={'/' + id.photo} alt={id.alt} width="420" height="420" draggable="false" className="size-full object-cover" />
            </div>

            <p className="absolute left-[18px] top-[262px] text-[22px] font-bold leading-7">{id.lines[0]}<br />{id.lines[1]}</p>
            <p className="absolute left-[18px] top-[326px] w-[190px] text-[13.5px] leading-5 text-[#444]">{id.program}</p>
            <p className="absolute left-[18px] top-[366px] text-[11.5px] font-semibold text-[#555]">{id.label}</p>

            <svg aria-hidden="true" viewBox="0 0 203 36" className="absolute left-[18px] top-[402px] h-9 w-[203px]" fill="#111">
                {BARS.map(([x, w]) => <rect key={x} x={x} width={w} height="36" />)}
            </svg>

            {/* shine: the hook moves it as the card swings or is hovered */}
            <span aria-hidden="true" className="holo-foil pointer-events-none absolute inset-0"></span>
            <span aria-hidden="true" className="holo-glare pointer-events-none absolute inset-0"></span>
        </div>
    );
}

/* The lanyard + a two-sided ID card. Front = Claire, back = Mariz.
   A click (or Enter / Space) flips it; dragging still swings it.
   The swinging physics lives in hooks/useLanyard.js, the flip is plain CSS 3D. */
export default function IdCard({ claire, mariz, firstSwing = 0.9 }) {
    const [showMariz, setShowMariz] = useState(false);
    const flip = () => setShowMariz((v) => !v);
    const { wrapRef, lanyardRef, cardRef } = useLanyard(firstSwing, flip);

    const now = showMariz ? mariz : claire;
    const next = showMariz ? claire : mariz;

    return (
        <div ref={wrapRef} className="relative mx-auto w-[280px] lg:mx-0 lg:h-[820px] lg:w-[340px]">
            <div
                ref={lanyardRef}
                tabIndex={0}
                role="button"
                aria-label={`Student ID card showing ${now.firstName}. Press Enter or Space to flip it to ${next.firstName}.`}
                className="mx-auto flex w-[280px] origin-top cursor-grab touch-pan-y select-none flex-col items-center"
            >
                {/* strap (changes colour with the side) */}
                <div className={'relative h-20 w-10 shrink-0 rounded-t-md transition-colors duration-500 lg:h-[230px] lg:rounded-none ' + (showMariz ? 'bg-[#7c4dff]' : 'bg-[#c8103e]')}>
                    <span aria-hidden="true" className="absolute left-1/2 top-[8px] hidden -translate-x-1/2 text-[10px] font-bold tracking-[1px] text-white [writing-mode:vertical-rl] lg:block">PORTFOLIO</span>
                    <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-10 w-[22px] -translate-x-1/2 rounded-lg bg-[#b8bcc8]"></span>
                </div>

                {/* cardRef sits on the part that does NOT rotate, so the shine follows the real cursor */}
                <div ref={cardRef} className="relative h-[455px] w-[280px] shrink-0 [perspective:1200px]">
                    <div
                        className="relative size-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] motion-reduce:transition-none"
                        style={{ transform: showMariz ? 'rotateY(180deg)' : 'none' }}
                    >
                        <Face person={claire} accent="#c41240" hidden={showMariz} />
                        <Face person={mariz} accent="#7c4dff" back hidden={!showMariz} />
                    </div>
                </div>
            </div>

            <p role="status" className="mt-5 text-center text-sm text-muted lg:absolute lg:inset-x-0 lg:top-[715px] lg:mt-0">
                Showing <strong className={showMariz ? 'text-mariz' : 'text-claire'}>{now.firstName}</strong>. Click the card to see {next.firstName}.
            </p>
        </div>
    );
}
