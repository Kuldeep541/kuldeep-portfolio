import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Zap, Globe, MapPin, Coffee, Sparkles } from 'lucide-react';
import aboutImage from '@/assets/about-me.jpg';

const highlights = [
  { icon: Code2,  label: 'Tech Stack',  value: 'React · Next.js · Node.js · PHP · MySQL · MongoDB · TypeScript' },
  { icon: Zap,    label: 'Specialty',   value: 'Full Stack Development · SaaS · Ecommerce · Government Portals' },
  { icon: Globe,  label: 'Open To',     value: 'Remote · Freelance · Full-time · Worldwide Opportunities' },
  { icon: Coffee, label: 'Fun Fact',    value: 'I turn coffee into code — and ideas into live products 🚀' },
];

const About = () => {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
  };
  const left = {
    hidden: { opacity: 0, x: -40, filter: 'blur(8px)' },
    show:   { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.22,1,0.36,1] } },
  };
  const right = {
    hidden: { opacity: 0, x: 40, filter: 'blur(8px)' },
    show:   { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.22,1,0.36,1] } },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-[#080808] py-32 px-6 sm:px-8 overflow-hidden"
      aria-label="About Kuldeep Prajapati"
    >
      {/* Dot bg */}
      <div className="absolute inset-0 dot-bg opacity-25 pointer-events-none" />

      {/* SVG decorative arc */}
      <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-[0.04]" aria-hidden="true">
        <circle cx="250" cy="250" r="200" fill="none" stroke="#C6FF34" strokeWidth="1" strokeDasharray="12 8" />
        <circle cx="250" cy="250" r="150" fill="none" stroke="#C6FF34" strokeWidth="0.5" strokeDasharray="6 12" />
        <circle cx="250" cy="250" r="100" fill="none" stroke="#C6FF34" strokeWidth="0.3" />
      </svg>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center"
        >
          {/* ── LEFT: Image ── */}
          <motion.div variants={left} className="relative order-2 lg:order-1">
            <div ref={imgRef} className="relative group">
              {/* Lime glow behind image */}
              <motion.div
                className="absolute -inset-1 rounded-3xl pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ background: 'linear-gradient(135deg, rgba(198,255,52,0.25) 0%, transparent 60%)', filter: 'blur(2px)' }}
              />

              {/* Image with parallax */}
              <div className="relative rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(198,255,52,0.1)' }}>
                <motion.img
                  src={aboutImage}
                  alt="Kuldeep Prajapati — Full Stack Developer based in Lucknow"
                  style={{ y: imgY }}
                  className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(8,8,8,0.65) 100%)' }} />
              </div>

              {/* Floating badge — location */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.7, type: 'spring', stiffness: 220 }}
                className="absolute -bottom-6 -right-5 z-20 glass-lime rounded-2xl px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin size={14} className="text-[#C6FF34]" />
                  <div>
                    <p className="text-[10px] text-white/35 font-semibold uppercase tracking-wider">Based in</p>
                    <p className="text-sm font-bold text-white">Lucknow, India</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — status */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: 8 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.9, type: 'spring', stiffness: 220 }}
                className="absolute -top-5 -left-5 z-20 glass rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles size={14} className="text-[#C6FF34]" />
                  <div>
                    <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider">Status</p>
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF34] animate-pulse" />
                      Open to Work
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* SVG corner bracket decorations */}
              <svg className="absolute -bottom-3 -left-3 w-8 h-8 text-[#C6FF34] opacity-40" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M2 16 L2 2 L16 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <svg className="absolute -top-3 -right-3 w-8 h-8 text-[#C6FF34] opacity-40 rotate-180" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M2 16 L2 2 L16 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <motion.div variants={right} className="order-1 lg:order-2 space-y-8">
            <div>
              <p className="section-label mb-5">About Me</p>
              <h2 className="text-4xl sm:text-5xl xl:text-[3.2rem] font-black leading-[1.02] tracking-[-0.03em]">
                <span className="text-white">Crafting Digital</span>
                <br />
                <span className="text-gradient">Experiences</span>
                <br />
                <span className="text-white">That Matter</span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-[15px] text-white/45 leading-[1.8]">
                I'm a <strong className="text-white font-semibold">Full Stack Developer</strong> based in Lucknow with expertise across modern web technologies. I build
                everything from SaaS platforms and ecommerce stores to government portals — always focused on
                performance, scalability and clean code.
              </p>
              <p className="text-[15px] text-white/45 leading-[1.8]">
                With <strong className="text-white font-semibold">14+ live projects</strong> and 5M+ monthly users collectively reached, I bring ideas from
                whiteboard to production. Currently open to remote, freelance and full-time opportunities worldwide.
              </p>
            </div>

            {/* Highlight cards */}
            <motion.div variants={stagger} className="space-y-2.5 pt-1">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <motion.div
                    key={h.label}
                    variants={left}
                    custom={i}
                    whileHover={{ x: 8, borderColor: 'rgba(198,255,52,0.3)', background: 'rgba(198,255,52,0.03)' }}
                    className="flex items-start gap-4 p-4 rounded-xl cursor-default transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(198,255,52,0.08)', border: '1px solid rgba(198,255,52,0.18)' }}
                    >
                      <Icon size={14} className="text-[#C6FF34]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.12em] mb-1">{h.label}</h3>
                      <p className="text-[13px] text-white/65 leading-relaxed">{h.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA row */}
            <div className="flex gap-3 pt-2">
              <motion.a
                href="https://drive.google.com/file/d/1gWzEsSc_PFIgk9NrysGeDZqCHQyTUKeh/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="btn-lime px-6 py-3 text-sm font-bold gap-2"
              >
                Download Resume
              </motion.a>
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="btn-outline px-6 py-3 text-sm gap-2"
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
