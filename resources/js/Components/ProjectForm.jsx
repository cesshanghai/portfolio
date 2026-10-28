import { Link } from '@inertiajs/react';
import FormField from '@/Components/FormField';
import MultiSelect from '@/Components/MultiSelect';

/* ONE form used by both Create.jsx and Edit.jsx.
   `form` is the object returned by Inertia's useForm(): it holds the typed values
   (so they are NOT lost when validation fails) and the errors sent back by Laravel. */
export default function ProjectForm({ form, onSubmit, owners, techOptions, existingImageUrl, submitLabel }) {
    const { data, setData, errors, processing } = form;

    // Laravel reports a bad item as "tech_stack.2", so fall back to the first of those
    const techError = errors.tech_stack ?? Object.entries(errors).find(([key]) => key.startsWith('tech_stack.'))?.[1];

    return (
        <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
            <FormField as="select" label="Belongs to" name="owner" value={data.owner} onChange={(e) => setData('owner', e.target.value)} error={errors.owner}>
                {Object.entries(owners).map(([key, name]) => <option key={key} value={key}>{name}</option>)}
            </FormField>

            <FormField label="Date completed" name="date_completed" type="date" value={data.date_completed} onChange={(e) => setData('date_completed', e.target.value)} error={errors.date_completed} />

            <div className="sm:col-span-2">
                <FormField label="Title" name="title" type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} error={errors.title} placeholder="DormEase" />
            </div>

            <div className="sm:col-span-2">
                <FormField as="textarea" label="Description" name="description" value={data.description} onChange={(e) => setData('description', e.target.value)} error={errors.description} hint={data.description.length + ' / 500 characters (minimum 20)'} placeholder="What does the project do?" />
            </div>

            <div className="sm:col-span-2">
                <MultiSelect label="Tech stack" name="tech_stack" options={techOptions} value={data.tech_stack} onChange={(list) => setData('tech_stack', list)} error={techError} hint="Choose one or more (up to 8)" placeholder="Select tools" />
            </div>

            <div className="sm:col-span-2">
                <FormField label="Project link (optional)" name="project_url" type="text" inputMode="url" value={data.project_url} onChange={(e) => setData('project_url', e.target.value)} error={errors.project_url} placeholder="https://example.com" />
            </div>

            <div className="sm:col-span-2">
                <FormField label="Image (optional)" name="image" type="file" accept="image/*" onChange={(e) => setData('image', e.target.files[0] ?? null)} error={errors.image} hint="JPG, PNG or WEBP, up to 2 MB" />
                {existingImageUrl && !data.image && (
                    <img src={existingImageUrl} alt="Current project image" className="mt-3 h-28 rounded-lg border border-line object-cover" />
                )}
            </div>

            <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button type="submit" disabled={processing} className="rounded-full bg-brand px-8 py-3.5 font-bold text-white shadow-[0_6px_8px_rgba(199,18,64,0.35)] hover:brightness-110 disabled:opacity-60">
                    {processing ? 'Saving…' : submitLabel}
                </button>
                <Link href={route('projects.index')} className="rounded-full border border-line px-8 py-3.5 font-semibold hover:border-brand-text">Cancel</Link>
            </div>
        </form>
    );
}
