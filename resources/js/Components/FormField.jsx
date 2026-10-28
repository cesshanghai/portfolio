/* A label + input + error message in one reusable piece.
   as="input" (default) | "textarea" | "select". Pass `error` from useForm().errors.
   The error appears right under the field it belongs to. */
export default function FormField({ label, name, error, hint, as: Tag = 'input', children, ...props }) {
    const size = props.type === 'file' ? 'h-auto py-2.5' : Tag === 'textarea' ? 'min-h-[120px] py-3' : 'h-[50px]';

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-sm font-semibold">{label}</label>
            <Tag
                id={name}
                name={name}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? name + '-error' : undefined}
                className={'w-full rounded-xl border border-line bg-surface px-4 text-ink placeholder:text-muted aria-[invalid=true]:border-brand-text ' + size}
                {...props}
            >
                {children}
            </Tag>
            {hint && !error && <p className="text-sm text-muted">{hint}</p>}
            {error && <p id={name + '-error'} role="alert" className="text-sm font-semibold text-brand-text">{error}</p>}
        </div>
    );
}
