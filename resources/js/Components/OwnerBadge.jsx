import { people, ownerStyle } from '@/data/people';

// Small coloured tag that says whose content this is (crimson = Claire, violet = Mariz)
export default function OwnerBadge({ owner }) {
    const person = people[owner];
    if (!person) return null;

    return (
        <span className={'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ' + ownerStyle[owner].badge}>
            <span aria-hidden="true" className={'size-2 rounded-full ' + ownerStyle[owner].dot}></span>
            {person.firstName}
        </span>
    );
}
