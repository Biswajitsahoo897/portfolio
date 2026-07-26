import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Projects() {
  return (
    <section id="work" className="border-t border-line py-20 sm:py-28">
      <div className="container-content">
        <ScrollReveal>
          <p className="eyebrow mb-4">Work</p>
          <h2 className="section-heading">Selected projects</h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-signal/60 hover:shadow-[0_10px_30px_-15px_rgba(95,225,201,0.2)]">
                
                {/* Sheen overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-signal/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-medium text-paper transition-colors duration-300 group-hover:text-signal">
                      {project.title}
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-fog">{project.period}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fog sm:text-base">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-surface2 px-2.5 py-1 font-mono text-[11px] text-fog transition-colors duration-300 group-hover:text-paper/80"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} source code`}
                        className="text-fog transition-all duration-300 hover:text-signal hover:scale-110"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live link`}
                        className="text-fog transition-all duration-300 hover:text-signal hover:scale-110"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}