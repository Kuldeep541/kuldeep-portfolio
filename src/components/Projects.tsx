import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, Globe, ShoppingBag, Landmark, GraduationCap, Wrench, Monitor } from 'lucide-react';

const projects = [
  {
    title: 'Toolively',
    description:
      'Full-stack SaaS platform with 100+ free online utilities — calculators, converters, generators, OCR & developer tools. Serves 5M+ monthly users with zero sign-up required. Privacy-first, client-side architecture.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    link: 'https://toolively.com/',
    icon: Wrench,
    category: 'SaaS Platform',
    featured: true,
  },
  {
    title: 'Nawaabiyat',
    description:
      'Premium Shopify ecommerce store offering authentic royal cuisine and gourmet food products with a seamless, conversion-optimised shopping experience.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'Ecommerce'],
    link: 'https://www.nawaabiyat.com/',
    icon: ShoppingBag,
    category: 'Ecommerce',
    featured: true,
  },
  {
    title: 'Tanmay Mukherjee Drum Circle',
    description:
      'Music artist portfolio with modern web technologies, optimised performance, and immersive audio-visual storytelling.',
    tech: ['React', 'JavaScript', 'Vercel'],
    link: 'https://tanmaydrumcircle.in/',
    icon: Monitor,
    category: 'Portfolio',
  },
  {
    title: 'Dr. Bhatia Surgical Center',
    description:
      'Medical center website with appointment booking system and patient information management.',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    link: 'https://drbhatiaent.com',
    icon: Globe,
    category: 'Healthcare',
  },
  {
    title: 'Dr. Bhatia Cancer Center',
    description:
      'Specialised cancer treatment website with patient consultation booking and department management.',
    tech: ['PHP', 'CodeIgniter', 'MySQL'],
    link: 'https://drbhatiacancer.com',
    icon: Globe,
    category: 'Healthcare',
  },
  {
    title: 'HPBSMDA Government Portal',
    description:
      'Official government administration portal serving Himachal Pradesh with seamless citizen workflows.',
    tech: ['PHP', 'CodeIgniter', 'MySQL'],
    link: 'https://bsmda.hp.gov.in',
    icon: Landmark,
    category: 'Government',
  },
  {
    title: 'HP Drug Licensing (DCLA)',
    description:
      'Licensing management system for pharmaceutical compliance, tracking and approval workflows.',
    tech: ['PHP', 'JavaScript', 'SQL'],
    link: 'https://dcla.hp.gov.in',
    icon: Landmark,
    category: 'Government',
  },
  {
    title: 'TAB Unscripted',
    description:
      'Modern content management platform for creative collaboration, publishing and media distribution.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    link: 'https://tabunscripted.in',
    icon: Monitor,
    category: 'CMS',
  },
  {
    title: 'TAB Library',
    description:
      'Educational resource management system with digital catalog, lending and student tracking features.',
    tech: ['PHP', 'CodeIgniter', 'MySQL'],
    link: 'https://tablibrary.in',
    icon: GraduationCap,
    category: 'EdTech',
  },
  {
    title: 'TAB Educational Institute',
    description:
      'Complete learning management system for course delivery, progress tracking and student management.',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    link: 'https://theabei.in',
    icon: GraduationCap,
    category: 'EdTech',
  },
  {
    title: 'The Artist Barefoot',
    description:
      'Creative agency website with portfolio showcase, project galleries and client inquiry management.',
    tech: ['React', 'MySQL', 'JavaScript'],
    link: 'https://theartistbarefoot.com',
    icon: Monitor,
    category: 'Agency',
  },
  {
    title: 'Urblinx Integrated Services',
    description:
      'Integrated Facility Management and Real Estate Advisory platform for smart building services.',
    tech: ['CodeIgniter', 'PHP', 'EmailJs'],
    link: 'https://urblinx.com',
    icon: Globe,
    category: 'Corporate',
  },
  {
    title: 'Checkin Portal',
    description:
      'Employee check-in and attendance management system with real-time tracking and admin dashboard.',
    tech: ['PHP', 'Core PHP', 'MySQL'],
    link: 'https://checkin.theartistbarefoot.com',
    icon: Monitor,
    category: 'HR Tool',
  },
  {
    title: 'Quiz Management System',
    description:
      'Desktop application for creating, managing, and conducting interactive educational quizzes.',
    tech: ['Java', 'Swing', 'SQLite'],
    link: 'https://github.com',
    icon: GraduationCap,
    category: 'Desktop App',
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col rounded-2xl p-6 transition-all duration-400 overflow-hidden ${
        project.featured ? 'ring-1 ring-[#C6FF34]/20' : ''
      }`}
      style={{
        background: hovered
          ? 'rgba(198,255,52,0.04)'
          : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(198,255,52,0.25)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(198,255,52,0.07)'
          : 'none',
        transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-1 rounded-md"
          style={{ background: 'rgba(198,255,52,0.12)', color: '#C6FF34', border: '1px solid rgba(198,255,52,0.25)' }}
        >
          Featured
        </div>
      )}

      {/* Icon + category */}
      <div className="flex items-center justify-between mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered ? 'rgba(198,255,52,0.15)' : 'rgba(198,255,52,0.07)',
            border: '1px solid rgba(198,255,52,0.2)',
          }}
        >
          <Icon size={18} className="text-[#C6FF34]" />
        </div>
        <span className="text-[11px] font-semibold text-white/25 uppercase tracking-[0.12em]">
          {project.category}
        </span>
      </div>

      {/* Title */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-white group-hover:text-[#C6FF34] transition-colors duration-300 leading-snug">
          {project.title}
        </h3>
        <motion.div
          animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ArrowUpRight size={18} className="text-[#C6FF34]" />
        </motion.div>
      </div>

      {/* Description */}
      <p className="text-sm text-white/40 leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t) => (
          <span key={t} className="skill-pill text-[11px]">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" ref={ref} className="relative bg-[#070707] py-32 px-6 sm:px-8 overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,255,52,0.2), transparent)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="section-label mb-4">Portfolio</p>
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 justify-between">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-[-0.025em] text-white">
              Featured{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #C6FF34, #f0ff8a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Projects
              </span>
            </h2>
            <p className="text-white/35 text-sm max-w-xs leading-relaxed">
              {projects.length} projects across government, healthcare, edtech, ecommerce & SaaS.
            </p>
          </div>
          <div className="w-16 h-0.5 bg-[#C6FF34] mt-6 rounded-full" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
