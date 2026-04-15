import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const ROLES = ['Full Stack Developer', 'React Expert', 'Node.js Engineer', 'UI/UX Enthusiast'];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Typewriter effect
  useEffect(() => {
    const role = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(198,255,52,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(198,255,52,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-20">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">

          {/* Availability badge */}
          <motion.div variants={item}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(198,255,52,0.08)',
                border: '1px solid rgba(198,255,52,0.2)',
                color: '#C6FF34',
              }}
              whileHover={{ scale: 1.03, background: 'rgba(198,255,52,0.12)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF34] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6FF34]" />
              </span>
              Available for new projects
            </motion.div>
          </motion.div>

          {/* Main headline */}
          <motion.div variants={item} className="space-y-2">
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-[-0.03em] text-white">
              Hi, I'm{' '}
              <span
                className="text-gradient"
                style={{
                  background: 'linear-gradient(135deg, #C6FF34 0%, #f0ff8a 50%, #C6FF34 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Kuldeep
              </span>
              <br />
              Prajapati
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={item} className="flex items-center gap-3">
            <div className="text-xl sm:text-2xl font-semibold text-white/50">
              <span className="text-white">{displayed}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-6 bg-[#C6FF34] ml-1 align-middle"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-white/45 max-w-2xl leading-relaxed font-light"
          >
            Building modern web applications with React, Next.js & Node.js.
            I turn complex problems into elegant, scalable digital products.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-2">
            <motion.button
              onClick={() => scrollTo('#contact')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lime px-7 py-3.5 text-base font-bold flex items-center gap-2.5 w-fit"
            >
              Get In Touch <ArrowRight size={18} />
            </motion.button>

            <motion.button
              onClick={() => scrollTo('#projects')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline px-7 py-3.5 text-base flex items-center gap-2.5 w-fit"
            >
              View Projects <ExternalLink size={16} />
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-5 pt-4">
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
                whileHover={{ scale: 1.15, y: -3, color: '#C6FF34' }}
                className="text-white/35 hover:text-[#C6FF34] transition-colors duration-300"
              >
                <Icon size={22} />
              </motion.a>
            ))}
            <div className="w-px h-5 bg-white/10 mx-1" />
            <span className="text-sm text-white/25 font-medium">Lucknow, India</span>
          </motion.div>

        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px border border-white/5 rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {[
            { number: '20+', label: 'Projects Built' },
            { number: '1+', label: 'Years Experience' },
            { number: '10+', label: 'Technologies' },
            { number: '1M+', label: 'Users Reached' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ background: 'rgba(198,255,52,0.04)' }}
              className="flex flex-col items-center justify-center px-6 py-6 gap-1 transition-all duration-300"
            >
              <span
                className="text-3xl sm:text-4xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #C6FF34, #f0ff8a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.number}
              </span>
              <span className="text-xs text-white/35 font-medium text-center">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/20 font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#C6FF34]/40 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
