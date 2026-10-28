// Devicon CDN helper (same icon set as the original portfolio)
export const dev = (name) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${name}/${name}-original.svg`;

const MAP = {
    html: 'html5', html5: 'html5', css: 'css3', css3: 'css3',
    'tailwind css': 'tailwindcss', tailwind: 'tailwindcss',
    javascript: 'javascript', js: 'javascript', react: 'react', laravel: 'laravel',
    php: 'php', mysql: 'mysql', java: 'java', 'c++': 'cplusplus',
    git: 'git', github: 'github', figma: 'figma', blender: 'blender',
    python: 'python', bootstrap: 'bootstrap', photoshop: 'photoshop', flutter: 'flutter', dart: 'dart',
};

// "Laravel" -> icon url, "SketchUp" -> null (shown as a plain tag)
export const techIcon = (name) => (MAP[name.toLowerCase()] ? dev(MAP[name.toLowerCase()]) : null);
