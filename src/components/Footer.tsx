import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Heart, Code2, ExternalLink } from 'lucide-react';

const socials = [
  { icon: Github,   href: 'https://github.com/kuldeep541',                       label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/kuldeep-prajapati-aa9276178', label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:kuldeeppprajapati2111@gmail.com',               label: 'Email' },
];

const navLinks = [
  { label: 'Work',    href: '#projects' },
  { label: 'Skills',  href: '#skills' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const skills = ['React.js', 'Next.js', 'Node.js', 'TypeScript', 'PHP', 'MySQL', 'Shopify'];

const Footer = () => {
  const year = new Date().getFullYear();
  const ref  = { current: null };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative bg-[#040404] overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      aria-label="Footer"
    >
      {/* Top lime glow bar */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #C6FF34 40%, rgba(198,255,52,0.6) 50%, #C6FF34 60%, transparent 100%)' }}
      />

      {/* SVG background grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" aria-hidden="true">
        <defs>
          <pattern id="footer-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#C6FF34" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>

      {/* Glow orb */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #C6FF34, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-8">

        {/* ── Top section ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

          {/* Brand col — span 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 space-y-5"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(198,255,52,0.1)', border: '1px solid rgba(198,255,52,0.25)' }}
              >
                <Code2 size={18} className="text-[#C6FF34]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                KP<span className="text-[#C6FF34]">.</span>
              </span>
            </div>

            <p className="text-[13px] text-white/35 leading-[1.8] max-w-xs">
              Full Stack Developer crafting scalable web applications — from SaaS platforms and ecommerce to government portals. Clean code. Real impact.
            </p>

            {/* Availability pulse */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping-lime absolute inline-flex h-full w-full rounded-full bg-[#C6FF34]" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6FF34]" />
              </span>
              <span className="text-[11px] font-semibold text-white/30">Open to new opportunities</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-white/30 hover:text-[#C6FF34] transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(198,255,52,0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.background  = 'rgba(198,255,52,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLAnchorElement).style.background  = 'rgba(255,255,255,0.04)';
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation col — span 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25 mb-5">Navigation</h3>
            <div className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 5, color: '#C6FF34' }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-[13px] text-white/40 hover:text-[#C6FF34] font-medium w-fit"
                >
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(198,255,52,0.4)' }}
                  />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Skills col — span 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25 mb-5">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <motion.span
                  key={s}
                  whileHover={{ scale: 1.05, color: '#C6FF34' }}
                  className="skill-pill cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTA col — span 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3 space-y-4"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">Let's Connect</h3>
            <p className="text-[13px] text-white/35 leading-relaxed">
              Available for freelance, remote positions and exciting collaborations.
            </p>
            <motion.a
              href="mailto:kuldeeppprajapati2111@gmail.com"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-lime inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold"
            >
              <Mail size={14} /> Say Hello
            </motion.a>
            <div className="pt-1">
              <motion.a
                href="https://drive.google.com/file/d/1gWzEsSc_PFIgk9NrysGeDZqCHQyTUKeh/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="text-[12px] text-white/30 hover:text-[#C6FF34] flex items-center gap-1.5 transition-colors duration-200 font-medium w-fit"
              >
                <ExternalLink size={11} /> View Resume
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-center sm:text-left">
            <p className="text-[11px] text-white/20 flex items-center gap-1.5">
              © {year} Kuldeep Prajapati. Made with
              <Heart size={10} className="text-[#C6FF34]" fill="#C6FF34" />
              in Lucknow
            </p>
            <span className="hidden sm:block w-px h-3 bg-white/10" />
            <p className="text-[11px] text-white/15">
              Full Stack Developer · React · Next.js · Node.js · PHP
            </p>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-black font-bold flex-shrink-0"
            style={{
              background: '#C6FF34',
              boxShadow: '0 0 20px rgba(198,255,52,0.4)',
            }}
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
