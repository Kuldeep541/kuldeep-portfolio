import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Code2, Database, Server, Globe, Palette, Terminal,
  GitBranch, Cloud, Layers, Cpu, Monitor, Smartphone,
} from 'lucide-react';

const categories = [
  {
    title: 'Frontend',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.15)',
    skills: [
      { name: 'React.js', level: 90, icon: Code2 },
      { name: 'TypeScript', level: 75, icon: Code2 },
      { name: 'JavaScript', level: 92, icon: Code2 },
      { name: 'Tailwind CSS', level: 88, icon: Palette },
      { name: 'HTML5 / CSS3', level: 95, icon: Globe },
      { name: 'Next.js', level: 80, icon: Monitor },
    ],
  },
  {
    title: 'Backend',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
    skills: [
      { name: 'Node.js', level: 85, icon: Server },
      { name: 'PHP', level: 88, icon: Code2 },
      { name: 'CodeIgniter', level: 80, icon: Layers },
      { name: 'RESTful APIs', level: 87, icon: Globe },
    ],
  },
  {
    title: 'Database & DevOps',
    color: '#c084fc',
    glow: 'rgba(192,132,252,0.15)',
    skills: [
      { name: 'MySQL', level: 85, icon: Database },
      { name: 'MongoDB', level: 78, icon: Database },
      { name: 'Git / GitHub', level: 90, icon: GitBranch },
      { name: 'Linux', level: 72, icon: Terminal },
      { name: 'AWS Basics', level: 58, icon: Cloud },
    ],
  },
  {
    title: 'Other',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.15)',
    skills: [
      { name: 'Java', level: 70, icon: Cpu },
      { name: 'Swing', level: 62, icon: Smartphone },
      { name: 'Shopify / Liquid', level: 72, icon: Layers },
      { name: 'Docker', level: 55, icon: Layers },
    ],
  },
];

const SkillBar = ({
  name, level, icon: Icon, color, delay,
}: {
  name: string; level: number; icon: React.ElementType; color: string; delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <Icon size={14} style={{ color }} className="opacity-70 group-hover:opacity-100 transition-opacity" />
          <span className="text-sm font-medium text-white/65 group-hover:text-white/85 transition-colors">
            {name}
          </span>
        </div>
        <span className="text-xs font-semibold" style={{ color, opacity: 0.7 }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${color}90, ${color})` }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: delay + 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const TechnicalSkills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="skills" ref={ref} className="relative bg-[#080808] py-32 px-6 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,255,52,0.15), transparent)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="section-label mb-4">Expertise</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-[-0.025em] text-white">
            Technical{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C6FF34, #f0ff8a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Skills
            </span>
          </h2>
          <div className="w-16 h-0.5 bg-[#C6FF34] mt-6 rounded-full" />
        </motion.div>

        {/* Category grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6 transition-all duration-400 group"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${cat.color}30`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${cat.glow}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ background: cat.color }}
                />
                <h3 className="text-base font-bold text-white/80">{cat.title}</h3>
                <span
                  className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-md"
                  style={{ background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30` }}
                >
                  {cat.skills.length} skills
                </span>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    color={cat.color}
                    delay={ci * 0.1 + si * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
        >
          {[
            { v: '20+', l: 'Technologies' },
            { v: '14+', l: 'Projects Built' },
            { v: '2+', l: 'Years Experience' },
            { v: '100%', l: 'Dedication' },
          ].map((s) => (
            <motion.div
              key={s.l}
              whileHover={{ background: 'rgba(198,255,52,0.04)' }}
              className="flex flex-col items-center justify-center py-6 gap-1 transition-all duration-300"
            >
              <span
                className="text-3xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #C6FF34, #f0ff8a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.v}
              </span>
              <span className="text-xs text-white/30 font-medium">{s.l}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkills;