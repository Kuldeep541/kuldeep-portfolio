import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Code2, Braces, Terminal as TermIcon } from 'lucide-react';

const ROLES = [
  'Full Stack Developer',
  'React & Next.js Expert',
  'Node.js Engineer',
  'Shopify Developer',
  'UI/UX Craftsman',
];

// ── SVG Background grid ──
const SVGBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.35 }}
    aria-hidden="true"
  >
    <defs>
      <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(198,255,52,0.12)" strokeWidth="0.5"/>
      </pattern>
      <radialGradient id="hero-vignette" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#080808" stopOpacity="0" />
        <stop offset="100%" stopColor="#080808" stopOpacity="1" />
      </radialGradient>
      <filter id="hero-glow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#hero-grid)" />
    <rect width="100%" height="100%" fill="url(#hero-vignette)" />
    {/* Decorative diagonal line */}
    <line x1="0" y1="100%" x2="40%" y2="0" stroke="rgba(198,255,52,0.06)" strokeWidth="1"
      style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animation: 'draw-line 3s ease 0.5s forwards' }}
    />
    <line x1="100%" y1="0" x2="60%" y2="100%" stroke="rgba(198,255,52,0.04)" strokeWidth="1"
      style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animation: 'draw-line 3s ease 1s forwards' }}
    />
  </svg>
);

// ── Floating orb ──
const Orb = ({ x, y, size, delay, opacity = 0.08 }: { x: string; y: string; size: number; delay: number; opacity?: number}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x, top: y, width: size, height: size,
      background: `radial-gradient(circle, rgba(198,255,52,${opacity}) 0%, transparent 70%)`,
      filter: 'blur(50px)',
    }}
    animate={{ scale: [1, 1.2, 1], opacity: [opacity*6, opacity*10, opacity*6] }}
    transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

// ── Typewriter ──
const useTypewriter = (words: string[], typingSpeed = 65, deleteSpeed = 35, pauseTime = 2400) => {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed);
    } else if (!isDeleting && text.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
    } else {
      setIsDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, typingSpeed, deleteSpeed, pauseTime]);

  return text;
};

// ── Counter ──
const Counter = ({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration * 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yParallax  = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opFade     = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scaleHero  = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const roleText = useTypewriter(ROLES);
  const [mounted, setMounted] = useState(false);

  // Magnetic mouse effect on CTA button
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 25 });
  const springY = useSpring(my, { stiffness: 200, damping: 25 });

  const handleMagnet = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.35);
    my.set((e.clientY - r.top - r.height / 2) * 0.35);
  }, [mx, my]);
  const resetMagnet = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  useEffect(() => { setMounted(true); }, []);

  // Stagger container
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const stats = [
    { n: 14, suffix: '+', label: 'Projects Built' },
    { n: 2,  suffix: '+', label: 'Years Exp.' },
    { n: 20, suffix: '+', label: 'Technologies' },
    { n: 5,  suffix: 'M+', label: 'Users Reached' },
  ];

  if (!mounted) return null;

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080808] noise-overlay"
      aria-label="Hero — Kuldeep Prajapati Full Stack Developer"
    >
      {/* SVG Grid bg */}
      <SVGBackground />

      {/* Orbs */}
      <Orb x="55%" y="-5%" size={700} delay={0} opacity={0.06} />
      <Orb x="-10%" y="50%" size={500} delay={3} opacity={0.04} />
      <Orb x="75%" y="65%" size={400} delay={5} opacity={0.05} />

      {/* Spinning SVG ring (decorative) */}
      <div className="absolute top-20 right-20 w-64 h-64 pointer-events-none hidden lg:block" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow opacity-10">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#C6FF34" strokeWidth="0.5"
            strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#C6FF34" strokeWidth="0.3"
            strokeDasharray="3 9" />
        </svg>
        {/* Orbiting dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-orbit w-3 h-3 rounded-full bg-[#C6FF34] opacity-70 animate-pulse-glow" />
        </div>
      </div>

      {/* Morphing blob (bottom-left) */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 pointer-events-none hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(198,255,52,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
        animate={{ borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Main content */}
      <motion.div
        style={{ y: yParallax, opacity: opFade, scale: scaleHero }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-28 pb-20"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-7">

          {/* Availability badge */}
          <motion.div variants={item}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold glass-lime"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-lime absolute inline-flex h-full w-full rounded-full bg-[#C6FF34]" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6FF34]" />
              </span>
              Available for new projects · Remote &amp; Freelance
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item}>
            <h1 className="text-[clamp(2.8rem,7.5vw,6.5rem)] font-black leading-[0.93] tracking-[-0.035em]">
              <span className="block text-white overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                  Hi, I'm
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-gradient"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
                >
                  Kuldeep
                </motion.span>
              </span>
              <span className="block text-white/90 overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}
                >
                  Prajapati
                </motion.span>
              </span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={item} className="flex items-center gap-3 h-10">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(198,255,52,0.1)', border: '1px solid rgba(198,255,52,0.2)' }}
            >
              <Code2 size={14} className="text-[#C6FF34]" />
            </div>
            <div className="text-lg sm:text-xl font-semibold text-white/60 font-[Space_Grotesk]">
              <span className="text-white">{roleText}</span>
              <span className="animate-cursor-blink inline-block w-0.5 h-5 bg-[#C6FF34] ml-1 align-middle" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-white/40 max-w-xl leading-relaxed font-light"
          >
            Building modern, scalable web applications — from SaaS platforms and ecommerce stores to 
            government portals. Clean code. Optimal performance. Real impact.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-2">
            <motion.button
              onClick={() => scrollTo('#contact')}
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              style={{ x: springX, y: springY }}
              whileTap={{ scale: 0.95 }}
              className="btn-lime px-8 py-4 text-[15px] font-bold gap-2.5 group"
            >
              Hire Me
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={17} />
              </motion.span>
            </motion.button>

            <motion.button
              onClick={() => scrollTo('#projects')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-outline px-8 py-4 text-[15px] gap-2 group"
            >
              View Projects <ExternalLink size={15} className="group-hover:rotate-12 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-4 pt-2">
            {[
              { icon: Github,   href: 'https://github.com/kuldeep541',                         label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/kuldeep-prajapati-aa9276178',   label: 'LinkedIn' },
              { icon: Mail,     href: 'mailto:kuldeeppprajapati2111@gmail.com',                 label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2, y: -4, color: '#C6FF34' }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-white/30 hover:text-[#C6FF34] transition-all glass"
              >
                <Icon size={18} />
              </motion.a>
            ))}
            <div className="w-px h-5 bg-white/10 mx-1" />
            <span className="text-xs text-white/20 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF34] opacity-60" />
              Lucknow, India
            </span>
          </motion.div>

        </motion.div>

        {/* ── Stats Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ background: 'rgba(198,255,52,0.05)' }}
              className="flex flex-col items-center justify-center py-7 px-4 gap-1.5 transition-all duration-300 relative"
            >
              {i < stats.length - 1 && (
                <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/5 hidden sm:block" />
              )}
              <span className="text-[2.2rem] font-black text-gradient leading-none">
                <Counter target={s.n} suffix={s.suffix} />
              </span>
              <span className="text-[11px] text-white/30 font-medium text-center">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Scrolling tech ticker ── */}
        <div className="mt-14 relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #080808, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, #080808, transparent)' }} />
          <div className="ticker-wrap py-3 border-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <div className="ticker-track">
              {['React.js','Next.js','Node.js','TypeScript','PHP','MySQL','MongoDB','Tailwind CSS','Shopify','REST API','Git','Vercel','CodeIgniter','JavaScript', 'React.js','Next.js','Node.js','TypeScript','PHP','MySQL','MongoDB','Tailwind CSS','Shopify','REST API','Git','Vercel','CodeIgniter','JavaScript'].map((t, i) => (
                <span key={i} className="flex items-center gap-4 mr-10 text-xs font-semibold text-white/20 uppercase tracking-[0.12em] whitespace-nowrap">
                  <span className="w-1 h-1 rounded-full bg-[#C6FF34] opacity-40" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[9px] text-white/15 font-bold tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            className="w-full bg-[#C6FF34] rounded-full"
            animate={{ height: ['0%', '100%', '0%'], y: ['-100%', '0%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '40%' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
