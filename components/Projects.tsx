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
              <article className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-signal/60">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-medium text-paper">
                      {project.title}
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-fog">{project.period}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fog sm:text-base">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-surface2 px-2.5 py-1 font-mono text-[11px] text-fog"
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
                        className="text-fog transition-colors hover:text-signal"
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
                        className="text-fog transition-colors hover:text-signal"
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
