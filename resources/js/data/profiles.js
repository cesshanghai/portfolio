import { dev } from '@/lib/icons';

/* ============================================================
   Static content for BOTH portfolios. The switcher in the navbar
   picks one of these by key. Projects are NOT here: they come
   from the database (see ProjectController / Projects pages).

   Keys must match App\Models\Project::OWNERS ('claire', 'friend').
   ============================================================ */

const skillGroups = (frontend, backend, tools) => [
    { title: 'Frontend', items: frontend },
    { title: 'Backend and data', items: backend },
    { title: 'Tools and design', items: tools },
];

export const profiles = {
    claire: {
        key: 'claire',
        firstName: 'Claire',
        navName: 'Princess Claire',
        fullName: 'Princess Claire Dominguez',
        heroName: ['Princess Claire', 'Dominguez'],
        badge: 'Third-year IT student · Aspiring web developer',
        school: 'Information Technology at Urdaneta City University, Pangasinan',
        intro: "I enjoy creating simple systems, designing layouts and exploring 3D modeling. Right now I'm turning a dorm management system called DormEase into real code with HTML, Tailwind, JavaScript and Laravel.",
        tech: [
            { name: 'HTML5', icon: dev('html5') },
            { name: 'Tailwind CSS', icon: dev('tailwindcss') },
            { name: 'JavaScript', icon: dev('javascript') },
            { name: 'Laravel', icon: dev('laravel') },
            { name: 'Figma', icon: dev('figma') },
        ],
        aboutPhoto: 'images/profile.jpg',
        aboutAlt: 'Princess Claire Dominguez in a black outfit',
        about: [
            "I'm a third-year Information Technology student at Urdaneta City University with basic knowledge in C++, Java, HTML and CSS. I like the moment a messy idea turns into a clear screen, so I usually start in Figma, then write the code.",
            "My biggest project right now is DormEase, a dormitory system with separate sides for residents and admins. I wrote its requirements document and pitch deck, and I'm helping build it with Laravel and React. I'm not the team's main programmer, so I'm using this portfolio to practice and to show what I can build on my own.",
        ],
        goals: [
            'Improve through experience by learning from mistakes, exploring new tools, and becoming more confident in my coding and problem-solving skills.',
            "Keep growing as a web developer by building real projects and learning from other people's code.",
        ],
        yearsStudying: 3,
        skills: skillGroups(
            [
                { name: 'HTML5', icon: dev('html5'), level: 'Comfortable', note: 'Semantic pages, like this one.' },
                { name: 'CSS', icon: dev('css3'), level: 'Comfortable', note: 'Flexbox, grid and layout design.' },
                { name: 'Tailwind CSS', icon: dev('tailwindcss'), level: 'Practicing', note: 'Utility classes and responsive breakpoints.' },
                { name: 'JavaScript', icon: dev('javascript'), level: 'Practicing', note: 'DOM, events and localStorage.' },
                { name: 'React', icon: dev('react'), level: 'Exploring', note: "DormEase's screens, through Inertia." },
            ],
            [
                { name: 'Laravel', icon: dev('laravel'), level: 'Exploring', note: 'The backend of DormEase.' },
                { name: 'MySQL', icon: dev('mysql'), level: 'Exploring', note: "DormEase's database." },
                { name: 'Java', icon: dev('java'), level: 'Exploring', note: 'Basic programming and simple systems.' },
                { name: 'C++', icon: dev('cplusplus'), level: 'Exploring', note: 'Basic programming and problem solving.' },
            ],
            [
                { name: 'Git', icon: dev('git'), level: 'Exploring', note: 'Branches and commits.' },
                { name: 'GitHub', icon: dev('github'), level: 'Exploring', note: 'Pushes on the DormEase repo.' },
                { name: 'Figma', icon: dev('figma'), level: 'Comfortable', note: 'Wireframes and layouts before any code.' },
                { name: 'Blender', icon: dev('blender'), level: 'Exploring', note: 'Learning 3D modeling and rendering.' },
                { name: 'SketchUp', icon: 'sketchup', level: 'Exploring', note: '3D models of simple spaces.' },
            ],
        ),
        softSkills: ['Technical writing', 'Presenting ideas', 'Scope planning', 'Teamwork'],
        education: [
            { title: 'Tertiary', period: '2024 - Present', lines: ['Bachelor of Science in Information Technology', 'Urdaneta City University'] },
            { title: 'Senior Highschool', period: '2022-2024', lines: ['Balungao National High School'] },
            { title: 'Junior Highschool', period: '2018-2022', lines: ['Balungao National High School'] },
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

    // ------------------------------------------------------------------
    // GROUPMATE: replace every placeholder below with her real details.
    // Keep the same keys. Photos go in public/images/ (see README).
    // ------------------------------------------------------------------
    friend: {
        key: 'friend',
        firstName: 'Friend',
        navName: 'Friend Name',
        fullName: 'Friend Name Surname',
        heroName: ['Friend Name', 'Surname'],
        badge: 'Third-year IT student · Aspiring developer',
        school: 'Information Technology at Urdaneta City University, Pangasinan',
        intro: 'Write one or two sentences about what she enjoys building and what she is learning right now.',
        tech: [
            { name: 'HTML5', icon: dev('html5') },
            { name: 'Tailwind CSS', icon: dev('tailwindcss') },
            { name: 'Laravel', icon: dev('laravel') },
        ],
        aboutPhoto: 'images/friend-profile.jpg',
        aboutAlt: 'Portrait of Friend Name',
        about: [
            'First paragraph: who she is, what she studies, and what she likes to do.',
            'Second paragraph: her current project and what her role in it is.',
        ],
        goals: ['First goal.', 'Second goal.'],
        yearsStudying: 3,
        skills: skillGroups(
            [
                { name: 'HTML5', icon: dev('html5'), level: 'Comfortable', note: 'Add a short note.' },
                { name: 'CSS', icon: dev('css3'), level: 'Practicing', note: 'Add a short note.' },
            ],
            [
                { name: 'Laravel', icon: dev('laravel'), level: 'Exploring', note: 'Add a short note.' },
                { name: 'MySQL', icon: dev('mysql'), level: 'Exploring', note: 'Add a short note.' },
            ],
            [
                { name: 'Git', icon: dev('git'), level: 'Exploring', note: 'Add a short note.' },
                { name: 'Figma', icon: dev('figma'), level: 'Practicing', note: 'Add a short note.' },
            ],
        ),
        softSkills: ['Communication', 'Teamwork'],
        education: [
            { title: 'Tertiary', period: '2024 - Present', lines: ['Bachelor of Science in Information Technology', 'Urdaneta City University'] },
        ],
        contact: {
            school: 'Urdaneta City University',
            email: 'friend@example.com',
            location: 'Pangasinan, Philippines',
            github: 'https://github.com/',
            githubLabel: 'github.com/username',
        },
        id: {
            photo: 'images/friend-id.jpg',
            alt: 'Portrait of Friend Name',
            lines: ['Friend Name', 'Surname'],
            program: 'BS Information Technology · 3rd year',
            label: 'PORTFOLIO ID · 2026',
        },
    },
};

export const profileList = Object.values(profiles);
