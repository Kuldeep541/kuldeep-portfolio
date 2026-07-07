import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Cpu,
  Layers,
  Zap,
  Globe,
  Code2,
  Terminal as TermIcon,
} from 'lucide-react';

// ── Roles typewriter ──────────────────────────────────────────
const ROLES = [
  'Full Stack Developer',
  'React & Next.js Expert',
  'Node.js Engineer',
  'Shopify Developer',
  'UI/UX Craftsman',
];

// ── Code lines that animate into the terminal ─────────────────
const CODE_LINES = [
  { text: 'const developer = {', color: '#C6FF34' },
  { text: '  name: "Kuldeep Prajapati",', color: '#e8ff9a' },
  { text: '  role: "Full Stack Dev",', color: '#e8ff9a' },
  { text: '  stack: ["React","Next","Node"],', color: '#88e0ff' },
  { text: '  projects: 22,', color: '#ff9f7f' },
  { text: '  users: "5M+",', color: '#ff9f7f' },
  { text: '  available: true,', color: '#C6FF34' },
  { text: '};', color: '#C6FF34' },
  { text: '', color: '' },
  { text: 'developer.build("greatProducts");', color: '#ffffff' },
];

// ── Floating tech badges ──────────────────────────────────────
const TECH_BADGES = [
  { label: 'React', icon: '⚛', x: '10%', y: '15%', delay: 0 },
  { label: 'Next.js', icon: '▲', x: '80%', y: '10%', delay: 0.4 },
  { label: 'Node', icon: '⬡', x: '88%', y: '55%', delay: 0.8 },
  { label: 'TypeScript', icon: 'TS', x: '5%', y: '70%', delay: 1.2 },
  { label: 'Shopify', icon: '🛒', x: '75%', y: '80%', delay: 1.6 },
  { label: 'PHP', icon: '🐘', x: '50%', y: '92%', delay: 2.0 },
];

// ── Particle canvas background ────────────────────────────────
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    // Particles
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x += (dx / dist) * 1.2;
          p.y += (dy / dist) * 1.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198,255,52,${p.alpha})`;
        ctx.fill();
      });

      // Constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(198,255,52,${0.06 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

// ── Typewriter hook ───────────────────────────────────────────
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

// ── Counter ───────────────────────────────────────────────────
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

// ── Animated terminal card ────────────────────────────────────
const CodeTerminal = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < CODE_LINES.length) {
        i++;
        setVisibleLines(i);
        setTimeout(tick, 280 + Math.random() * 120);
      }
    };
    const start = setTimeout(tick, 800);
    return () => clearTimeout(start);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotateY: -10 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="relative w-full max-w-[480px]"
      style={{ perspective: '1000px' }}
    >
      {/* Glow behind card */}
      <div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(198,255,52,0.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10,10,10,0.85)',
          border: '1px solid rgba(198,255,52,0.15)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(198,255,52,0.08)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-3 px-5 py-3.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <TermIcon size={12} className="text-[#C6FF34] opacity-60" />
            <span className="text-[11px] text-white/30 font-mono tracking-wider">developer.js</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(198,255,52,0.12)', color: '#C6FF34', border: '1px solid rgba(198,255,52,0.2)' }}
            >
              JS
            </span>
          </div>
        </div>

        {/* Code body */}
        <div className="p-5 font-mono text-[13px] leading-[1.9] min-h-[260px]">
          {/* Line numbers + code */}
          {CODE_LINES.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-4"
            >
              <span className="text-white/10 select-none w-4 text-right flex-shrink-0 text-[11px] leading-[1.9]">
                {i + 1}
              </span>
              <span style={{ color: line.color || 'transparent' }}>
                {line.text}
                {i === visibleLines - 1 && (
                  <span
                    className="inline-block w-2 h-[14px] align-middle ml-0.5 animate-cursor-blink"
                    style={{ background: '#C6FF34', borderRadius: '1px' }}
                  />
                )}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Status bar */}
        <div
          className="flex items-center gap-3 px-5 py-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(198,255,52,0.03)' }}
        >
          <span className="flex items-center gap-1.5 text-[10px] text-[#C6FF34]/50 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF34] animate-pulse" />
            Running…
          </span>
          <span className="ml-auto text-[10px] text-white/15 font-mono">UTF-8</span>
          <span className="text-[10px] text-white/15 font-mono">JavaScript</span>
        </div>
      </div>

      {/* Floating skill chips around the card */}
      {[
        { label: '⚛ React', top: '-14px', right: '20px', delay: 1.2 },
        { label: '▲ Next.js', top: '30%', right: '-60px', delay: 1.5 },
        { label: '⬡ Node.js', bottom: '20%', right: '-52px', delay: 1.8 },
        { label: '🛒 Shopify', bottom: '-14px', left: '30px', delay: 2.1 },
      ].map(({ label, delay, ...pos }) => (
        <motion.span
          key={label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, type: 'spring', stiffness: 200 }}
          className="absolute text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap"
          style={{
            ...pos,
            background: 'rgba(198,255,52,0.08)',
            border: '1px solid rgba(198,255,52,0.22)',
            color: '#C6FF34',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(198,255,52,0.08)',
          }}
        >
          {label}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ── Glitch text component ─────────────────────────────────────
const GlitchName = ({ name }: { name: string }) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const loop = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 300);
      setTimeout(loop, 4000 + Math.random() * 3000);
    };
    const t = setTimeout(loop, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      className="relative inline-block text-gradient"
      style={{ display: 'inline-block' }}
    >
      {name}
      {glitching && (
        <>
          <span
            className="absolute inset-0 text-[#ff4d4d]"
            style={{ clipPath: 'inset(10% 0 60% 0)', transform: 'translateX(-3px)', mixBlendMode: 'screen' }}
            aria-hidden="true"
          >
            {name}
          </span>
          <span
            className="absolute inset-0 text-[#4dffff]"
            style={{ clipPath: 'inset(60% 0 5% 0)', transform: 'translateX(3px)', mixBlendMode: 'screen' }}
            aria-hidden="true"
          >
            {name}
          </span>
        </>
      )}
    </span>
  );
};

// ── Main Hero ─────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const roleText = useTypewriter(ROLES);
  const [mounted, setMounted] = useState(false);

  // Magnetic CTA
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

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 50, filter: 'blur(12px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const stats = [
    { n: 22, suffix: '+', label: 'Projects Built', icon: Layers },
    { n: 2, suffix: '+', label: 'Years Exp.', icon: Zap },
    { n: 13, suffix: '+', label: 'Technologies', icon: Cpu },
    { n: 5, suffix: 'M+', label: 'Users Reached', icon: Globe },
  ];

  if (!mounted) return null;

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]"
      aria-label="Hero — Kuldeep Prajapati Full Stack Developer"
    >
      {/* Particle constellation bg */}
      <ParticleField />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(198,255,52,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Left vertical accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="absolute left-8 top-0 bottom-0 w-px origin-top hidden xl:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(198,255,52,0.15) 30%, rgba(198,255,52,0.08) 70%, transparent)' }}
      />

      {/* Corner bracket decoration TL */}
      <div className="absolute top-28 left-12 hidden xl:block pointer-events-none" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M1 20 L1 1 L20 1" stroke="rgba(198,255,52,0.2)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {/* Corner bracket decoration BR */}
      <div className="absolute bottom-28 right-12 hidden xl:block pointer-events-none" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M39 20 L39 39 L20 39" stroke="rgba(198,255,52,0.2)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Spinning ring — top right */}
      <div className="absolute top-24 right-16 w-52 h-52 pointer-events-none hidden xl:block" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow opacity-[0.07]">
          <circle cx="100" cy="100" r="92" fill="none" stroke="#C6FF34" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="100" cy="100" r="68" fill="none" stroke="#C6FF34" strokeWidth="0.5" strokeDasharray="3 10" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-orbit w-2.5 h-2.5 rounded-full bg-[#C6FF34] animate-pulse-glow" />
        </div>
      </div>

      {/* Main parallax wrapper */}
      <motion.div
        style={{ y: yParallax, opacity: opFade, scale: scaleHero }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 xl:px-14 pt-28 pb-20"
      >
        {/* ── Two-column layout ── */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-16 xl:gap-10">

          {/* LEFT — text content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 space-y-7 max-w-2xl"
          >
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
              <h1 className="text-[clamp(3rem,7.5vw,6.5rem)] font-black leading-[0.9] tracking-[-0.035em]">
                <span className="block text-white/70 text-[clamp(1.2rem,2.5vw,2rem)] font-medium tracking-[0.18em] uppercase mb-3 text-white/30">
                  Hello, I'm
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  >
                    <GlitchName name="Kuldeep" />
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-white"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
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
              <div className="text-lg sm:text-xl font-semibold text-white/50 font-[Space_Grotesk]">
                <span className="text-white">{roleText}</span>
                <span className="animate-cursor-blink inline-block w-0.5 h-5 bg-[#C6FF34] ml-1 align-middle" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p variants={item} className="text-base sm:text-lg text-white/35 max-w-lg leading-relaxed font-light">
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
                { icon: Github, href: 'https://github.com/kuldeep541', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/kuldeep-prajapati-aa9276178', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:kuldeeppprajapati2111@gmail.com', label: 'Email' },
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

          {/* RIGHT — interactive code terminal */}
          <div className="flex-1 flex items-center justify-center xl:justify-end">
            <CodeTerminal />
          </div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden relative"
          style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}
        >
          {/* Glowing top border */}
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(198,255,52,0.3), transparent)' }} />

          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ background: 'rgba(198,255,52,0.05)' }}
              className="flex flex-col items-center justify-center py-7 px-4 gap-2 transition-all duration-300 relative group"
            >
              {i < stats.length - 1 && (
                <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/5 hidden sm:block" />
              )}
              <s.icon
                size={14}
                className="text-[#C6FF34] opacity-30 group-hover:opacity-70 transition-opacity"
              />
              <span className="text-[2.2rem] font-black text-gradient leading-none">
                <Counter target={s.n} suffix={s.suffix} />
              </span>
              <span className="text-[11px] text-white/30 font-medium text-center">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Scrolling tech ticker ── */}
        <div className="mt-12 relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #080808, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, #080808, transparent)' }} />
          <div className="ticker-wrap py-3 border-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <div className="ticker-track">
              {[
                'React.js', 'Next.js', 'Node.js', 'TypeScript', 'PHP', 'MySQL', 'MongoDB',
                'Tailwind CSS', 'Shopify', 'REST API', 'Git', 'Vercel', 'CodeIgniter', 'JavaScript',
                'React.js', 'Next.js', 'Node.js', 'TypeScript', 'PHP', 'MySQL', 'MongoDB',
                'Tailwind CSS', 'Shopify', 'REST API', 'Git', 'Vercel', 'CodeIgniter', 'JavaScript',
              ].map((t, i) => (
                <span
                  key={i}
                  className="flex items-center gap-4 mr-10 text-xs font-semibold text-white/20 uppercase tracking-[0.12em] whitespace-nowrap"
                >
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
        transition={{ delay: 2.5 }}
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
