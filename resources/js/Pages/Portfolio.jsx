import { Head } from '@inertiajs/react';
import { shared } from '@/data/people';
import useTheme from '@/hooks/useTheme';
import useActiveSection from '@/hooks/useActiveSection';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Hero from '@/Components/Sections/Hero';
import About from '@/Components/Sections/About';
import Skills from '@/Components/Sections/Skills';
import Projects from '@/Components/Sections/Projects';
import Education from '@/Components/Sections/Education';
import Contact from '@/Components/Sections/Contact';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'education', 'contact'];

/* The one public page, shared by both of us.
   `projects` (everyone's rows) arrives as a prop from PortfolioController;
   the Skills and Projects sections filter it in the browser with the Both / Claire / Mariz toggle. */
export default function Portfolio({ projects }) {
    const { dark, toggle } = useTheme();
    const active = useActiveSection(SECTION_IDS);

    return (
        <div className="min-h-screen bg-page font-sans text-ink antialiased">
            <Head title={shared.pageTitle} />

            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:font-semibold focus:text-white">Skip to content</a>

            <Navbar active={active} dark={dark} onToggleTheme={toggle} />

            <main id="main">
                <Hero swing={0.9} />
                <About projectCount={projects.length} />
                <Skills />
                <Projects projects={projects} />
                <Education />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}
