import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "TAB Unscripted",
      description: "Modern content management platform for creative collaboration and distribution.",
      tech: ["React", "Node.js", "MongoDB", "Tailwind"],
      link: "https://tabunscripted.in"
    },
    {
      title: "HPBSMDA Portal",
      description: "Government administration portal serving Himachal Pradesh with seamless workflows.",
      tech: ["PHP", "CodeIgniter", "MySQL"],
      link: "https://bsmda.hp.gov.in"
    },
    {
      title: "HP Drug Licensing",
      description: "Licensing management system for pharmaceutical compliance and tracking.",
      tech: ["PHP", "JavaScript", "SQL"],
      link: "https://dcla.hp.gov.in"
    },
    {
      title: "TAB Library",
      description: "Educational resource management system with catalog and lending features.",
      tech: ["PHP", "CodeIgniter", "MySQL"],
      link: "https://tablibrary.in"
    },
    {
      title: "TAB Educational Institute",
      description: "Complete learning management system for course delivery and student tracking.",
      tech: ["PHP", "MySQL", "JavaScript"],
      link: "https://theabei.in"
    },
    {
      title: "Dr. Bhatia Surgical Center",
      description: "Medical center website with appointment booking and patient management.",
      tech: ["PHP", "MySQL", "JavaScript"],
      link: "https://drbhatiasent.com"
    }
  ];

  return (
    <section id="projects" ref={ref} className="bg-black py-32 px-6 sm:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter text-white">
            Featured<br />
            <span className="text-lime">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-lime mt-6 rounded-full" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group border border-lime/30 rounded-2xl p-8 bg-black hover:border-lime/60 hover:shadow-[0_0_20px_rgba(198,255,52,0.4)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <h3 className="text-2xl font-bold text-white group-hover:text-lime transition-colors duration-300">
                  {project.title}
                </h3>
                <ArrowUpRight className="text-lime flex-shrink-0 group-hover:scale-125 transition-transform duration-300" size={28} />
              </div>

              <p className="text-white mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-lime/10 text-lime text-sm font-semibold rounded-lg border border-lime/30">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
