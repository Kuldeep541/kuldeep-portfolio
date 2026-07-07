import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, ArrowRight, Github, Linkedin, CheckCircle, Send, MapPin } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const fieldStyle = (name: string) => ({
    border: `1px solid ${focused === name ? '#C6FF34' : 'rgba(255,255,255,0.07)'}`,
    background: focused === name ? 'rgba(198,255,52,0.03)' : 'rgba(255,255,255,0.02)',
    boxShadow: focused === name ? '0 0 0 3px rgba(198,255,52,0.08)' : 'none',
    transition: 'all 0.25s ease',
  });

  const contacts = [
    { icon: Mail,    label: 'Email',    value: 'kuldeeppprajapati2111@gmail.com', href: 'mailto:kuldeeppprajapati2111@gmail.com' },
    { icon: Phone,   label: 'Phone',    value: '+91 7380892966',                   href: 'tel:+917380892966' },
    { icon: MapPin,  label: 'Location', value: 'Lucknow, Uttar Pradesh, India',    href: 'https://maps.google.com/?q=Lucknow' },
  ];
  const socials = [
    { icon: Github,   href: 'https://github.com/kuldeep541',                       label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/kuldeep-prajapati-aa9276178', label: 'LinkedIn' },
    { icon: Mail,     href: 'mailto:kuldeeppprajapati2111@gmail.com',               label: 'Email' },
  ];

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
  const fadeUp  = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] as [number,number,number,number] } },
  };

  return (
    <>
      {/* ── Scrolling CTA band ── */}
      <div className="relative bg-[#C6FF34] py-4 overflow-hidden" aria-hidden="true">
        <div className="ticker-wrap">
          <div className="ticker-track" style={{ animationDuration: '20s' }}>
            {Array(16).fill(null).map((_, i) => (
              <span key={i} className="flex items-center gap-5 mr-10 text-[11px] font-black text-black uppercase tracking-[0.15em] whitespace-nowrap">
                <span className="text-base">✦</span>
                Available for Hire
              </span>
            ))}
          </div>
        </div>
      </div>

      <section
        id="contact"
        ref={ref}
        className="relative bg-[#080808] py-32 px-6 sm:px-8 overflow-hidden"
        aria-label="Contact Kuldeep Prajapati"
      >
        {/* Pattern */}
        <div className="absolute inset-0 dot-bg opacity-15 pointer-events-none" />
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(198,255,52,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(198,255,52,0.2), transparent)' }} />

        {/* SVG decorative element */}
        <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 opacity-[0.035] pointer-events-none" aria-hidden="true">
          <defs>
            <radialGradient id="cg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C6FF34" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="144" cy="144" r="120" fill="none" stroke="#C6FF34" strokeWidth="1" strokeDasharray="10 6"/>
          <circle cx="144" cy="144" r="80"  fill="none" stroke="#C6FF34" strokeWidth="0.5" strokeDasharray="5 10"/>
          <circle cx="144" cy="144" r="40"  fill="rgba(198,255,52,0.2)" />
        </svg>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="section-label mb-4 justify-center">Contact</p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.02] tracking-[-0.03em] mb-4">
              <span className="text-white">Let's Build</span>{' '}
              <span className="text-gradient">Together</span>
            </h2>
            <p className="text-sm text-white/30 max-w-sm mx-auto leading-relaxed">
              Have a project, question or opportunity? Reach out — I reply within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* ── Left: Info ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="lg:col-span-2 space-y-4"
            >
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label === 'Location' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(198,255,52,0.2)';
                    (e.currentTarget as HTMLAnchorElement).style.background  = 'rgba(198,255,52,0.03)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLAnchorElement).style.background  = 'rgba(255,255,255,0.025)';
                  }}
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ background: 'rgba(198,255,52,0.08)', border: '1px solid rgba(198,255,52,0.18)' }}>
                    <Icon size={16} className="text-[#C6FF34]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/30 mb-0.5">{label}</p>
                    <p className="text-[13px] font-semibold text-white truncate">{value}</p>
                  </div>
                </motion.a>
              ))}

              {/* Resume */}
              <motion.a
                variants={fadeUp}
                href="https://drive.google.com/file/d/1gWzEsSc_PFIgk9NrysGeDZqCHQyTUKeh/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-lime flex items-center justify-center gap-2.5 py-3.5 text-sm font-bold"
              >
                Download Resume <ArrowRight size={15} />
              </motion.a>

              {/* Socials */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 pt-1">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.2, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-white/30 hover:text-[#C6FF34] transition-all"
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
                    <Icon size={16} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22,1,0.36,1] }}
              className="lg:col-span-3 rounded-2xl p-7 sm:p-8"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Send a message</h3>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="py-16 flex flex-col items-center gap-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 280, delay: 0.1 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse-glow"
                      style={{ background: 'rgba(198,255,52,0.1)', border: '2px solid rgba(198,255,52,0.4)' }}
                    >
                      <CheckCircle size={28} className="text-[#C6FF34]" />
                    </motion.div>
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-white mb-1">Message sent! 🎉</h4>
                      <p className="text-sm text-white/35">I'll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-white/30 mb-2">Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                          onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                          required placeholder="Your name"
                          style={fieldStyle('name')}
                          className="w-full px-4 py-3.5 rounded-xl text-white text-[13px] placeholder-white/15 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-white/30 mb-2">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                          onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                          required placeholder="your@email.com"
                          style={fieldStyle('email')}
                          className="w-full px-4 py-3.5 rounded-xl text-white text-[13px] placeholder-white/15 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-white/30 mb-2">Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                        onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                        placeholder="Project inquiry / Freelance / Job opportunity..."
                        style={fieldStyle('subject')}
                        className="w-full px-4 py-3.5 rounded-xl text-white text-[13px] placeholder-white/15 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-white/30 mb-2">Message *</label>
                      <textarea name="message" value={formData.message} onChange={handleChange}
                        onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                        required rows={5} placeholder="Tell me about your project, timeline and budget..."
                        style={fieldStyle('message')}
                        className="w-full px-4 py-3.5 rounded-xl text-white text-[13px] placeholder-white/15 outline-none resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={!sending ? { scale: 1.02, y: -1 } : {}}
                      whileTap={!sending ? { scale: 0.97 } : {}}
                      className="btn-lime w-full flex items-center justify-center gap-2.5 py-4 font-bold text-[14px] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <><Send size={15} /> Send Message</>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
