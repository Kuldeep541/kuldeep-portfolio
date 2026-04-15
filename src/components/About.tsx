import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Zap, Globe, MapPin } from 'lucide-react';
import aboutImage from '@/assets/about-me.jpg';

const highlights = [
  {
    icon: Code2,
    label: 'Tech Stack',
    value: 'React · Next.js · Node.js · PHP · MySQL · MongoDB · TypeScript',
  },
  {
    icon: Zap,
    label: 'Specialty',
    value: 'Full Stack Development & Performance Optimization',
  },
  {
    icon: Globe,
    label: 'Open To',
    value: 'Remote opportunities worldwide · Freelance · Full-time roles',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="about" ref={ref} className="relative bg-[#080808] py-32 px-6 sm:px-8 overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left — Image */}
          <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
            <div className="relative group">
              {/* Decorative border offset */}
              <motion.div
                className="absolute -inset-px rounded-3xl"
                style={{ background: 'linear-gradient(135deg, rgba(198,255,52,0.3), transparent 60%)', zIndex: 0 }}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div
                className="relative rounded-3xl overflow-hidden z-10"
                style={{ border: '1px solid rgba(198,255,52,0.12)' }}
              >
                <img
                  src={aboutImage}
                  alt="Kuldeep Prajapati"
                  className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(8,8,8,0.7) 100%)' }}
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 16 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-5 -right-5 z-20 glass-lime rounded-2xl px-5 py-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#C6FF34]" />
                  <div>
                    <p className="text-xs text-white/45 font-medium">Based in</p>
                    <p className="text-sm font-bold text-white">Lucknow, India</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <motion.div variants={fadeUp}>
              <p className="section-label mb-4">About Me</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-[-0.025em] text-white">
                Crafting Digital
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #C6FF34 0%, #f0ff8a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Experiences
                </span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-base sm:text-lg text-white/55 leading-relaxed">
                I'm a <span className="text-white font-semibold">Full Stack Developer</span> passionate about building
                exceptional digital experiences. With expertise across modern web technologies, I craft scalable 
                solutions that solve real problems.
              </p>
              <p className="text-base sm:text-lg text-white/55 leading-relaxed">
                From concept to deployment — I focus on clean code, optimal performance, and intuitive design.
                Currently available for remote opportunities worldwide.
              </p>
            </motion.div>

            {/* Highlight cards */}
            <motion.div variants={stagger} className="space-y-3 pt-2">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    whileHover={{ x: 6, borderColor: 'rgba(198,255,52,0.35)' }}
                    className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div
                      className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(198,255,52,0.08)', border: '1px solid rgba(198,255,52,0.2)' }}
                    >
                      <Icon size={16} className="text-[#C6FF34]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white/45 mb-1">{item.label}</h3>
                      <p className="text-sm text-white/75 leading-relaxed">{item.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
