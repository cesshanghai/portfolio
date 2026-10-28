import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ProjectForm from '@/Components/ProjectForm';

export default function Create({ owners, techOptions }) {
    const form = useForm({
        owner: Object.keys(owners)[0],
        title: '',
        description: '',
        tech_stack: [],
        project_url: '',
        date_completed: '',
        image: null,
    });

    // forceFormData: the image is a file, so the request must be multipart
    const submit = (e) => {
        e.preventDefault();
        form.post(route('projects.store'), { forceFormData: true });
    };

    return (
        <AdminLayout title="Add project" heading="Add project">
            <ProjectForm form={form} onSubmit={submit} owners={owners} techOptions={techOptions} submitLabel="Create project" />
        </AdminLayout>
    );
}
