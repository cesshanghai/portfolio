import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ProjectForm from '@/Components/ProjectForm';

export default function Edit({ project, owners, techOptions }) {
    const form = useForm({
        _method: 'put', // PHP can't read files from a real PUT request, so we POST and tell Laravel it is a PUT
        owner: project.owner,
        title: project.title,
        description: project.description,
        tech_stack: project.tech_stack.split(',').map((t) => t.trim()).filter(Boolean), // "Laravel, React" -> ['Laravel','React']
        project_url: project.project_url ?? '',
        date_completed: project.date_completed,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('projects.update', project.id), { forceFormData: true });
    };

    return (
        <AdminLayout title={'Edit ' + project.title} heading="Edit project">
            <ProjectForm form={form} onSubmit={submit} owners={owners} techOptions={techOptions} existingImageUrl={project.image_url} submitLabel="Save changes" />
        </AdminLayout>
    );
}
