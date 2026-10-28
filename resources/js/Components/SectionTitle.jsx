// Heading with the gradient underline. Used by every section.
export default function SectionTitle({ id, children, subtitle }) {
    return (
        <div className="section-heading flex flex-col gap-3.5">
            <h2 id={id} className="text-4xl font-bold md:text-5xl">{children}</h2>
            <span aria-hidden="true" className="section-underline"></span>
            {subtitle && <p className="max-w-[700px] text-[17px] leading-7 text-muted">{subtitle}</p>}
        </div>
    );
}
