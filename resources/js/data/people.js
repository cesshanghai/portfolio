import { dev } from '@/lib/icons';

/* ============================================================
   Static content for BOTH people on the one shared page.
   Projects are NOT here: they come from the database
   (see ProjectController / Projects pages).

   Keys MUST match App\Models\Project::OWNERS ('claire', 'mariz').
   Mariz: replace every "TODO" with her real details.
   Her photos go in public/images/ (mariz-profile.jpg, mariz-id.jpg).
   ============================================================ */

export const OWNER_KEYS = ['claire', 'mariz'];

// Full class names are written out so Tailwind can see them
export const ownerStyle = {
    claire: { dot: 'bg-claire', text: 'text-claire', badge: 'border-claire/40 bg-claire/10 text-claire', border: 'border-claire' },
    mariz: { dot: 'bg-mariz', text: 'text-mariz', badge: 'border-mariz/40 bg-mariz/10 text-mariz', border: 'border-mariz' },
};

const group = (title, items) => ({ title, items });

export const people = {
    claire: {
        key: 'claire',
        firstName: 'Claire',
        fullName: 'Princess Claire Dominguez',
        about: [
            "I'm a third-year Information Technology student at Urdaneta City University with basic knowledge in C++, Java, HTML and CSS. I like the moment a messy idea turns into a clear screen, so I usually start in Figma, then write the code.",
            "My biggest project right now is DormEase, a dormitory system with separate sides for residents and admins. I wrote its requirements document and pitch deck, and I'm helping build it with Laravel and React.",
        ],
        goals: [
            'Improve through experience by learning from mistakes, exploring new tools, and becoming more confident in my coding and problem-solving skills.',
            "Keep growing as a web developer by building real projects and learning from other people's code.",
        ],
        tech: ['html5', 'tailwindcss', 'javascript', 'laravel', 'figma'],
        photo: 'images/profile.jpg',
        photoAlt: 'Princess Claire Dominguez in a black outfit',
        skills: [
            group('Frontend', [
                { name: 'HTML5', icon: dev('html5'), level: 'Comfortable', note: 'Semantic pages, like this one.' },
                { name: 'CSS', icon: dev('css3'), level: 'Comfortable', note: 'Flexbox, grid and layout design.' },
                { name: 'Tailwind CSS', icon: dev('tailwindcss'), level: 'Practicing', note: 'Utility classes and responsive breakpoints.' },
                { name: 'JavaScript', icon: dev('javascript'), level: 'Practicing', note: 'DOM, events and localStorage.' },
                { name: 'React', icon: dev('react'), level: 'Exploring', note: "DormEase's screens, through Inertia." },
            ]),
            group('Backend and data', [
                { name: 'Laravel', icon: dev('laravel'), level: 'Exploring', note: 'The backend of DormEase.' },
                { name: 'MySQL', icon: dev('mysql'), level: 'Exploring', note: "DormEase's database." },
                { name: 'Java', icon: dev('java'), level: 'Exploring', note: 'Basic programming and simple systems.' },
                { name: 'C++', icon: dev('cplusplus'), level: 'Exploring', note: 'Basic programming and problem solving.' },
            ]),
            group('Tools and design', [
                { name: 'Git', icon: dev('git'), level: 'Exploring', note: 'Branches and commits.' },
                { name: 'GitHub', icon: dev('github'), level: 'Exploring', note: 'Pushes on the DormEase repo.' },
                { name: 'Figma', icon: dev('figma'), level: 'Comfortable', note: 'Wireframes and layouts before any code.' },
                { name: 'Blender', icon: dev('blender'), level: 'Exploring', note: 'Learning 3D modeling and rendering.' },
                { name: 'SketchUp', icon: 'sketchup', level: 'Exploring', note: '3D models of simple spaces.' },
            ]),
        ],
        softSkills: ['Technical writing', 'Presenting ideas', 'Scope planning', 'Teamwork'],
        education: [
            { title: 'Tertiary', period: '2024 - Present', lines: ['Bachelor of Science in Information Technology', 'Urdaneta City University'] },
            { title: 'Senior Highschool', period: '2022 - 2024', lines: ['Balungao National High School'] },
            { title: 'Junior Highschool', period: '2018 - 2022', lines: ['Balungao National High School'] },
            { title: 'Elementary', period: '2012 - 2018', lines: ['Balungao Central School'] },
        ],
        contact: {
            school: 'Urdaneta City University',
            email: 'dominguezprincessclaire@gmail.com',
            location: 'Pangasinan, Philippines',
            github: 'https://github.com/cesshanghai',
            githubLabel: 'github.com/cesshanghai',
        },
        id: {
            photo: 'images/second-profile.jpg',
            alt: 'Portrait of Princess Claire Dominguez',
            lines: ['Princess Claire', 'Dominguez'],
            program: 'BS Information Technology · 3rd year',
            label: 'PORTFOLIO ID · 2026',
        },
    },

    mariz: {
        key: 'mariz',
        firstName: 'Mariz',
        fullName: 'Mariz Iglesias',
                about: [
            "I'm a thoughtful and detail-oriented Information Technology student who values listening, learning, and improving through experience. I take my time to understand problems and express my skills through the work I create. Although I'm still building my confidence in communication, I'm gradually learning to share my ideas, collaborate with others, and trust my abilities.",
        ],
        goals: [
            'Build my confidence in programming and problem-solving by working on practical projects, learning from mistakes, and applying my knowledge to develop useful, user-friendly systems.',
            'Grow as a web developer by exploring new technologies, learning from other developers, and gaining hands-on experience in designing and building effective web applications.',
        ],
        tech: ['html5', 'tailwindcss', 'javascript', 'laravel', 'figma'],
        photo: 'images/mariz-profile.jpg',
        photoAlt: 'Portrait of Mariz Iglesias',
        skills: [
            group('Frontend', [
                { name: 'HTML5', icon: dev('html5'), level: 'Comfortable', note: 'Page structure, forms and semantic tags.' },
                { name: 'CSS', icon: dev('css3'), level: 'Practicing', note: 'Styling, flexbox and responsive layouts.' },
                { name: 'Tailwind CSS', icon: dev('tailwindcss'), level: 'Practicing', note: 'Utility classes and responsive breakpoints.' },
                { name: 'JavaScript', icon: dev('javascript'), level: 'Practicing', note: 'DOM, events and simple interactivity.' },
                { name: 'React', icon: dev('react'), level: 'Exploring', note: 'Components, props and state.' },
            ]),
            group('Backend and data', [
                { name: 'Laravel', icon: dev('laravel'), level: 'Exploring', note: 'Routes, controllers and PHP web apps.' },
                { name: 'MySQL', icon: dev('mysql'), level: 'Exploring', note: 'Tables, queries and relationships.' },
                { name: 'Java', icon: dev('java'), level: 'Exploring', note: 'Basic programming and simple systems.' },
                { name: 'C++', icon: dev('cplusplus'), level: 'Exploring', note: 'Basic programming and problem solving.' },
            ]),
            group('Tools and design', [
                { name: 'Git', icon: dev('git'), level: 'Exploring', note: 'Branches, commits and version control.' },
                { name: 'GitHub', icon: dev('github'), level: 'Exploring', note: 'Pushing and sharing code in repositories.' },
                { name: 'Figma', icon: dev('figma'), level: 'Practicing', note: 'Wireframes and layouts before coding.' },
                { name: 'Blender', icon: dev('blender'), level: 'Exploring', note: 'Learning 3D modeling and rendering.' },
                { name: 'SketchUp', icon: 'sketchup', level: 'Exploring', note: 'Simple 3D models of spaces.' },
            ]),
        ],
        softSkills: ['Communication', 'Teamwork'],
        education: [
            { title: 'Tertiary', period: '2024 - Present', lines: ['Bachelor of Science in Information Technology', 'Urdaneta City University'] },
            { title: 'Senior Highschool', period: '2022 - 2024', lines: ['Coloscaoyan National High School'] },
            { title: 'Junior Highschool', period: '2018 - 2022', lines: ['Coloscaoyan National High School'] },
            { title: 'Elementary', period: '2012 - 2018', lines: ['Obillo Elementary School'] },
        ],
        contact: {
            school: 'Urdaneta City University',
            email: 'mariziglesias06@example.com',
            location: 'Tarlac, Philippines',
            github: 'https://github.com/ziee',
            githubLabel: 'github.com/ziee',
        },
        id: {
            photo: 'images/mariz-id.jpg',
            alt: 'Portrait of Mariz Iglesias',
            lines: ['Mariz', 'Iglesias'],
            program: 'BS Information Technology · 3rd year',
            label: 'PORTFOLIO ID · 2026',
        },
    },
};

export const peopleList = OWNER_KEYS.map((k) => people[k]);

/* What the two of us share */
export const shared = {
    navName: 'Claire & Mariz',
    pageTitle: 'Princess Claire & Mariz | IT Student Portfolio',
    names: 'Princess Claire Dominguez & Mariz Iglesias',
    heroName: ['Princess Claire', '& Mariz Iglesias'],
    badge: 'Third-year IT students · Aspiring web developers',
    school: 'Information Technology at Urdaneta City University, Pangasinan',
    intro: 'We are two IT students who build simple systems and websites with Laravel, React and Tailwind. Flip the card to meet each of us, then see what we made.',
    yearsStudying: 3,
};

/* Union of both people's tech chips (no repeats) for the hero */
const TECH_NAMES = { html5: 'HTML5', tailwindcss: 'Tailwind CSS', javascript: 'JavaScript', laravel: 'Laravel', figma: 'Figma', react: 'React' };
export const heroTech = [...new Set(peopleList.flatMap((p) => p.tech))].map((id) => ({
    name: TECH_NAMES[id] ?? id,
    icon: dev(id),
}));

/* ------------------------------------------------------------
   Merge both skill lists so a skill both of us have becomes ONE
   card with two entries.
   Result: [{ title, items: [{ name, icon, entries: [{ owner, level, note }] }] }]
   ------------------------------------------------------------ */
function mergeSkills() {
    const groups = new Map();
    peopleList.forEach((p) => {
        p.skills.forEach((g) => {
            if (!groups.has(g.title)) groups.set(g.title, new Map());
            const items = groups.get(g.title);
            g.items.forEach((s) => {
                if (!items.has(s.name)) items.set(s.name, { name: s.name, icon: s.icon, entries: [] });
                items.get(s.name).entries.push({ owner: p.key, level: s.level, note: s.note });
            });
        });
    });
    return [...groups].map(([title, items]) => ({ title, items: [...items.values()] }));
}

export const skillGroups = mergeSkills();

export const softSkills = (() => {
    const map = new Map();
    peopleList.forEach((p) => p.softSkills.forEach((name) => {
        if (!map.has(name)) map.set(name, { name, owners: [] });
        map.get(name).owners.push(p.key);
    }));
    return [...map.values()];
})();

export const toolCount = skillGroups.reduce((n, g) => n + g.items.length, 0);
