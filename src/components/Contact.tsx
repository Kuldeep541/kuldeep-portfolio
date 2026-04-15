import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, ArrowRight, Github, Linkedin, CheckCircle, Send } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-3.5 rounded-xl text-white text-sm font-medium placeholder-white/20 outline-none transition-all duration-300 ${
      focused === name
        ? 'border-[#C6FF34] bg-[rgba(198,255,52,0.04)]'
        : 'border-white/8 bg-white/[0.025] hover:border-white/15'
    }`;

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  };

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'kuldeeppprajapati2111@gmail.com',
      href: 'mailto:kuldeeppprajapati2111@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7380892966',
      href: 'tel:+917380892966',
    },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/kuldeep541', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/kuldeep-prajapati-aa9276178', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:kuldeeppprajapati2111@gmail.com', label: 'Email' },
  ];

  return (
    <section id="contact" ref={ref} className="relative bg-[#080808] py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 dot-bg opacity-15 pointer-events-none" />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(198,255,52,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
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
          className="mb-16 text-center"
        >
          <p className="section-label mb-4">Contact</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-[-0.025em] text-white mb-4">
            Let's Build{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C6FF34, #f0ff8a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Together
            </span>
          </h2>
          <p className="text-base text-white/35 max-w-md mx-auto leading-relaxed">
            Got a project in mind? Let's collaborate and create something amazing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact links */}
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(198,255,52,0.25)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(198,255,52,0.04)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.025)';
                }}
              >
                <div
                  className="w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(198,255,52,0.1)', border: '1px solid rgba(198,255,52,0.2)' }}
                >
                  <Icon size={18} className="text-[#C6FF34]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-white/35 font-semibold uppercase tracking-[0.1em] mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-white truncate">{value}</p>
                </div>
              </motion.a>
            ))}

            {/* Resume download */}
            <motion.a
              variants={fadeUp}
              href="https://drive.google.com/file/d/1s9ppoRMGFS2qJUvyI8cuviyBoxE3H8tn/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lime flex items-center justify-center gap-2.5 py-3.5 font-bold text-sm"
            >
              Download Resume <ArrowRight size={16} />
            </motion.a>

            {/* Socials */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
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
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 rounded-2xl p-7 sm:p-8"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Send a message</h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center gap-4 py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(198,255,52,0.1)', border: '2px solid rgba(198,255,52,0.4)' }}
                  >
                    <CheckCircle size={28} className="text-[#C6FF34]" />
                  </motion.div>
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-white mb-1">Message sent!</h4>
                    <p className="text-sm text-white/40">I'll get back to you soon.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-[0.1em] mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        required
                        placeholder="John Doe"
                        className={inputClass('name')}
                        style={{ border: '1px solid', borderColor: focused === 'name' ? '#C6FF34' : 'rgba(255,255,255,0.08)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-[0.1em] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        required
                        placeholder="john@example.com"
                        className={inputClass('email')}
                        style={{ border: '1px solid', borderColor: focused === 'email' ? '#C6FF34' : 'rgba(255,255,255,0.08)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-[0.1em] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className={`${inputClass('message')} resize-none`}
                      style={{ border: '1px solid', borderColor: focused === 'message' ? '#C6FF34' : 'rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-lime w-full flex items-center justify-center gap-2.5 py-3.5 font-bold text-sm mt-2"
                  >
                    <Send size={15} /> Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
