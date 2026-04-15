import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/kuldeep541', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/kuldeep-prajapati-aa9276178', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:kuldeeppprajapati2111@gmail.com', label: 'Email' },
];

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative bg-[#050505] px-6 sm:px-8 pt-16 pb-8 overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Top border glow */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,255,52,0.3), transparent)' }}
      />

      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="text-3xl font-black tracking-tight text-white">
              KP<span className="text-[#C6FF34]">.</span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Full Stack Developer crafting modern digital experiences — from idea to production.
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF34] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6FF34]" />
              </span>
              <span className="text-xs text-white/30 font-medium">Open to opportunities</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xs font-semibold text-white/25 uppercase tracking-[0.15em] mb-5">Navigation</h3>
            <div className="space-y-2.5">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ x: 4, color: '#C6FF34' }}
                  className="flex items-center gap-2 text-sm text-white/45 hover:text-[#C6FF34] transition-colors duration-200 font-medium w-fit"
                >
                  <span
                    className="w-1 h-1 rounded-full bg-[#C6FF34] opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <h3 className="text-xs font-semibold text-white/25 uppercase tracking-[0.15em]">Connect</h3>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-white/35 hover:text-[#C6FF34] transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(198,255,52,0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(198,255,52,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
            <motion.a
              href="https://drive.google.com/file/d/1s9ppoRMGFS2qJUvyI8cuviyBoxE3H8tn/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lime inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold"
            >
              View Resume ↗
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.05)' }} />

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 flex items-center gap-1.5">
            © {year} Kuldeep Prajapati · Built with{' '}
            <Heart size={11} className="text-[#C6FF34] inline" fill="#C6FF34" /> in Lucknow
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-black font-bold transition-all duration-300"
            style={{
              background: '#C6FF34',
              boxShadow: '0 0 16px rgba(198,255,52,0.35)',
            }}
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
