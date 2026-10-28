import { useState } from 'react';
import { people, peopleList } from '@/data/people';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Front-end only (as in the original): nothing is sent anywhere.
function check(name, value) {
    const v = value.trim();
    if (name === 'name' && v.length < 2) return 'Please enter your name (at least 2 characters).';
    if (name === 'email' && !EMAIL.test(v)) return 'Please enter a valid email, like name@example.com.';
    if (name === 'message' && v.length < 10) return 'Your message should be at least 10 characters.';
    if (name === 'message' && v.length > 500) return 'Your message must be 500 characters or fewer.';
    return '';
}

const field = 'w-full rounded-xl border border-line bg-surface px-4 text-ink placeholder:text-muted aria-[invalid=true]:border-brand-text';

export default function ContactForm() {
    const [values, setValues] = useState({ to: 'both', name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');

    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: check(name, value) }); // re-check once an error showed
    };

    const submit = (e) => {
        e.preventDefault();
        setStatus('');
        const found = {};
        ['name', 'email', 'message'].forEach((k) => { found[k] = check(k, values[k]); });
        setErrors(found);
        if (Object.values(found).some(Boolean)) return;

        const target = values.to === 'both' ? 'Claire and Mariz' : people[values.to].firstName;
        setStatus('Thanks, ' + values.name.trim() + '! Your message for ' + target + ' is ready to send. (This demo form does not actually send anything.)');
        setValues({ to: values.to, name: '', email: '', message: '' });
    };

    const Err = ({ name }) => errors[name] ? <p id={name + '-error'} className="text-sm font-semibold text-brand-text">{errors[name]}</p> : null;

    return (
        <form onSubmit={submit} noValidate className="flex flex-col gap-[18px]">
            <p className="text-[17px] text-link">Interested in collaborating or learning more? Get in touch with either of us!</p>

            <div className="flex flex-col gap-2">
                <label htmlFor="to" className="text-sm font-semibold">Send to</label>
                <select id="to" name="to" value={values.to} onChange={change} className={field + ' h-[50px]'}>
                    <option value="both">Both of us</option>
                    {peopleList.map((p) => <option key={p.key} value={p.key}>{p.firstName}</option>)}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" maxLength={80} value={values.name} onChange={change} aria-invalid={!!errors.name} aria-describedby="name-error" placeholder="Your name" className={field + ' h-[50px]'} />
                <Err name="name" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" maxLength={120} value={values.email} onChange={change} aria-invalid={!!errors.email} aria-describedby="email-error" placeholder="you@example.com" className={field + ' h-[50px]'} />
                <Err name="email" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold">Message</label>
                <textarea id="message" name="message" maxLength={500} value={values.message} onChange={change} aria-invalid={!!errors.message} aria-describedby="message-error" placeholder="Write your message here" className={field + ' h-[154px] resize-y py-3'} />
                <Err name="message" />
                <p className="text-right text-sm text-muted">{values.message.length} / 500</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="rounded-full bg-brand px-8 py-4 text-base font-bold text-white shadow-[0_6px_8px_rgba(199,18,64,0.35)] hover:brightness-110">Send message</button>
                <p role="status" className="font-semibold text-ok">{status}</p>
            </div>
        </form>
    );
}
