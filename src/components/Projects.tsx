import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, Globe, ShoppingBag, Landmark, GraduationCap, Wrench, Monitor, Tag, Github } from 'lucide-react';

const projects = [
  {
    title: 'Toolively',
    tagline: '100+ Free Online Tools Platform',
    description: 'Full-stack SaaS platform serving 5M+ monthly users with 100+ utilities — calculators, converters, OCR, generators. Zero sign-up. 100% client-side privacy.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    link: 'https://toolively.com/',
    icon: Wrench,
    category: 'SaaS',
    featured: true,
    accent: '#C6FF34',
  },
  {
    title: 'Nawaabiyat',
    tagline: 'Premium Royal Cuisine Ecommerce',
    description: 'Shopify ecommerce store for authentic royal cuisine products with conversion-optimised UX, custom Liquid templates and seamless checkout.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    link: 'https://www.nawaabiyat.com/',
    icon: ShoppingBag,
    category: 'Ecommerce',
    featured: true,
    accent: '#C6FF34',
  },
  {
    title: 'HPBSMDA Portal',
    tagline: 'Government Administration Portal',
    description: 'Official government portal serving Himachal Pradesh citizens with seamless administrative workflows.',
    tech: ['PHP', 'CodeIgniter', 'MySQL'],
    link: 'https://bsmda.hp.gov.in',
    icon: Landmark,
    category: 'Government',
  },
  {
    title: 'HP Drug Licensing',
    tagline: 'Pharmaceutical Compliance System',
    description: 'Drug licensing management system for pharmaceutical compliance tracking and regulatory approvals.',
    tech: ['PHP', 'JavaScript', 'SQL'],
    link: 'https://dcla.hp.gov.in',
    icon: Landmark,
    category: 'Government',
  },
  {
    title: 'Dr. Bhatia Surgical Center',
    tagline: 'Healthcare & Appointment Booking',
    description: 'Medical center website with appointment booking, patient information management and department showcase.',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    link: 'https://drbhatiaent.com',
    icon: Globe,
    category: 'Healthcare',
  },
  {
    title: 'Dr. Bhatia Cancer Center',
    tagline: 'Cancer Treatment & Consultation',
    description: 'Specialised cancer treatment website with patient consultation form and department management.',
    tech: ['PHP', 'CodeIgniter', 'MySQL'],
    link: 'https://drbhatiacancer.com',
    icon: Globe,
    category: 'Healthcare',
  },
  {
    title: 'TAB Unscripted',
    tagline: 'Creative Content Platform',
    description: 'Modern content management platform for creative collaboration, publishing and media distribution.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    link: 'https://tabunscripted.in',
    icon: Monitor,
    category: 'CMS',
  },
  {
    title: 'TAB Library',
    tagline: 'Digital Resource Management',
    description: 'Educational resource management system with digital catalog, lending and student tracking.',
    tech: ['PHP', 'CodeIgniter', 'MySQL'],
    link: 'https://tablibrary.in',
    icon: GraduationCap,
    category: 'EdTech',
  },
  {
    title: 'TAB Educational Institute',
    tagline: 'Learning Management System',
    description: 'Complete LMS for course delivery, student progress tracking and exam management.',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    link: 'https://theabei.in',
    icon: GraduationCap,
    category: 'EdTech',
  },
  {
    title: 'The Artist Barefoot',
    tagline: 'Creative Agency Website',
    description: 'Creative agency website with portfolio showcase, project galleries and client inquiry system.',
    tech: ['React', 'MySQL', 'JavaScript'],
    link: 'https://theartistbarefoot.com',
    icon: Monitor,
    category: 'Agency',
  },
  {
    title: 'Urblinx Integrated Services',
    tagline: 'Facility Management Platform',
    description: 'Integrated Facility Management and Real Estate Advisory platform for smart building services.',
    tech: ['CodeIgniter', 'PHP', 'EmailJs'],
    link: 'https://urblinx.com',
    icon: Globe,
    category: 'Corporate',
  },
  {
    title: 'Tanmay Drum Circle',
    tagline: 'Music Artist Portfolio',
    description: 'Music artist portfolio with modern animation, audio integration and optimised performance.',
    tech: ['React', 'JavaScript', 'Vercel'],
    link: 'https://tanmaydrumcircle.in/',
    icon: Monitor,
    category: 'Portfolio',
  },
  {
    title: 'Checkin Portal',
    tagline: 'Attendance Management System',
    description: 'Employee check-in and attendance management with real-time tracking and admin dashboard.',
    tech: ['PHP', 'Core PHP', 'MySQL'],
    link: 'https://checkin.theartistbarefoot.com',
    icon: Monitor,
    category: 'HR Tool',
  },
  {
    title: 'Quiz Management System',
    tagline: 'Desktop Educational App',
    description: 'Java desktop application for creating, managing, and conducting interactive educational quizzes.',
    tech: ['Java', 'Swing', 'SQLite'],
    link: 'https://github.com',
    icon: GraduationCap,
    category: 'Desktop',
  },
];

// Spotlight card — tracks mouse position and shows a highlight glow
const SpotlightCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const Icon = project.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative flex flex-col rounded-2xl p-6 overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(198,255,52,0.2)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(198,255,52,0.07)' : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      aria-label={`${project.title} — ${project.tagline}`}
    >
      {/* Spotlight gradient that follows mouse */}
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: useTransform(
              [mx, my],
              ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(198,255,52,0.07), transparent 70%)`
            ),
          }}
        />
      )}

      {/* Featured banner */}
      {project.featured && (
        <div className="absolute top-0 right-0 overflow-hidden rounded-tr-2xl w-20 h-20 pointer-events-none">
          <div
            className="absolute right-[-24px] top-[12px] w-[100px] text-[9px] font-black tracking-[0.15em] uppercase text-black text-center py-1 rotate-45"
            style={{ background: '#C6FF34' }}
          >
            Featured
          </div>
        </div>
      )}

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: 'rgba(198,255,52,0.08)', border: '1px solid rgba(198,255,52,0.18)' }}
        >
          <Icon size={17} className="text-[#C6FF34]" />
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-md"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}
          >
            {project.category}
          </span>
          <motion.div
            animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={17} className="text-[#C6FF34]" />
          </motion.div>
        </div>
      </div>

      {/* Title + tagline */}
      <h3 className="text-[15px] font-bold text-white group-hover:text-[#C6FF34] transition-colors duration-300 mb-1 leading-snug">
        {project.title}
      </h3>
      <p className="text-[11px] font-semibold text-[#C6FF34]/50 mb-3 uppercase tracking-[0.08em]">
        {project.tagline}
      </p>

      {/* Description */}
      <p className="text-[13px] text-white/35 leading-relaxed mb-5 flex-1">{project.description}</p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map((t) => (
          <span key={t} className="skill-pill text-[10px]">{t}</span>
        ))}
      </div>
    </motion.a>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-[#060606] py-32 px-6 sm:px-8 overflow-hidden"
      aria-label="Projects Portfolio"
    >
      {/* SVG decorative pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
        <defs>
          <pattern id="proj-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(198,255,52,0.08)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#proj-grid)" />
      </svg>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,255,52,0.25), transparent)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="section-label mb-4">Portfolio</p>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1] tracking-[-0.03em]">
              <span className="text-white">Featured </span>
              <span className="text-gradient">Projects</span>
            </h2>
            <div className="flex items-center gap-2 glass-lime px-4 py-2 rounded-xl w-fit">
              <Tag size={13} className="text-[#C6FF34]" />
              <span className="text-xs font-bold text-[#C6FF34]">{projects.length} Live Projects</span>
            </div>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-0.5 bg-[#C6FF34] mt-5 rounded-full"
          />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <SpotlightCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com/kuldeep541"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="btn-outline inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold"
          >
            <Github size={16} /> View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
