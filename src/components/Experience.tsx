import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Calendar, Award } from 'lucide-react';

const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'The Artist Barefoot Pvt. Ltd.',
    period: '2024 – Present',
    type: 'Full-time',
    description:
      'Leading full-stack development using React, Node.js, PHP, and MySQL. Built scalable web apps including government portals, educational platforms, and business websites.',
    achievements: [
      'Developed 20+ production applications',
      'Managed end-to-end project delivery',
      'Collaborated with cross-functional teams',
      'Implemented modern UI/UX designs',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'I.T. Academics Pvt. Ltd.',
    period: 'Oct 2024 – Nov 2024',
    type: 'Contract',
    description:
      'Built educational technology solutions including learning management systems and student portals with modern web technologies.',
    achievements: [
      'Built learning management systems',
      'Integrated payment gateways',
      'Optimised database performance',
      'Maintained legacy codebases',
    ],
  },
];

const education = [
  {
    degree: 'B.Tech — Computer Science Engineering',
    institution: 'Bansal Institute of Engineering & Technology',
    period: '2018 – 2022',
    grade: '7.7 CGPA',
  },
  {
    degree: 'Intermediate (XII)',
    institution: 'S.B.N. Inter College',
    period: '2017 – 2018',
    grade: '73%',
  },
  {
    degree: 'High School (X)',
    institution: 'S.B.N. Inter College',
    period: '2015 – 2016',
    grade: '78%',
  },
];

const TimelineItem = ({
  children,
  index,
  isLast,
}: {
  children: React.ReactNode;
  index: number;
  isLast: boolean;
}) => (
  <div className="relative flex gap-6">
    {/* Line + dot */}
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.4, type: 'spring', stiffness: 300 }}
        className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
        style={{
          background: '#C6FF34',
          boxShadow: '0 0 12px rgba(198,255,52,0.6)',
        }}
      />
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.8, ease: 'easeOut' }}
          className="flex-1 w-px mt-2 origin-top"
          style={{ background: 'rgba(198,255,52,0.15)' }}
        />
      )}
    </div>
    <div className="pb-10 flex-1">{children}</div>
  </div>
);

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative bg-[#070707] py-32 px-6 sm:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,255,52,0.15), transparent)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <p className="section-label mb-4">Background</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-[-0.025em] text-white">
            Experience &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C6FF34, #f0ff8a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Education
            </span>
          </h2>
          <div className="w-16 h-0.5 bg-[#C6FF34] mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* === Experience === */}
          <motion.div {...fadeUp(0.15)}>
            <div className="flex items-center gap-3 mb-10">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(198,255,52,0.1)', border: '1px solid rgba(198,255,52,0.2)' }}
              >
                <Briefcase size={15} className="text-[#C6FF34]" />
              </div>
              <h3 className="text-lg font-bold text-white/70">Work Experience</h3>
            </div>

            <div>
              {experiences.map((exp, i) => (
                <TimelineItem key={exp.company} index={i} isLast={i === experiences.length - 1}>
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: 4 }}
                    className="rounded-2xl p-5 transition-all duration-300 group"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(198,255,52,0.2)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(198,255,52,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)';
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-bold text-white text-base">{exp.title}</h4>
                        <p className="text-[#C6FF34] text-sm font-semibold mt-0.5">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5"
                          style={{
                            background: 'rgba(198,255,52,0.08)',
                            border: '1px solid rgba(198,255,52,0.2)',
                            color: '#C6FF34',
                          }}
                        >
                          <Calendar size={11} /> {exp.period}
                        </span>
                        <span
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md text-white/40"
                          style={{ background: 'rgba(255,255,255,0.05)' }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-white/40 leading-relaxed mb-4">{exp.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {exp.achievements.map((a) => (
                        <div key={a} className="flex items-start gap-2">
                          <div
                            className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                            style={{ background: '#C6FF34' }}
                          />
                          <span className="text-xs text-white/45">{a}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </TimelineItem>
              ))}
            </div>
          </motion.div>

          {/* === Education === */}
          <motion.div {...fadeUp(0.3)}>
            <div className="flex items-center gap-3 mb-10">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(198,255,52,0.1)', border: '1px solid rgba(198,255,52,0.2)' }}
              >
                <GraduationCap size={15} className="text-[#C6FF34]" />
              </div>
              <h3 className="text-lg font-bold text-white/70">Education</h3>
            </div>

            <div>
              {education.map((edu, i) => (
                <TimelineItem key={edu.degree} index={i} isLast={i === education.length - 1}>
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.4, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: 4 }}
                    className="rounded-2xl p-5 transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(198,255,52,0.2)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(198,255,52,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)';
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm leading-snug">{edu.degree}</h4>
                        <p className="text-[#C6FF34] text-xs font-medium mt-1">{edu.institution}</p>
                        <p className="text-white/30 text-xs mt-1 flex items-center gap-1">
                          <Calendar size={11} /> {edu.period}
                        </p>
                      </div>
                      <div
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
                        style={{ background: 'rgba(198,255,52,0.08)', border: '1px solid rgba(198,255,52,0.2)' }}
                      >
                        <Award size={13} className="text-[#C6FF34]" />
                        <span className="text-sm font-black text-[#C6FF34]">{edu.grade}</span>
                      </div>
                    </div>
                  </motion.div>
                </TimelineItem>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;