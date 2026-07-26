import { ArrowDownToLine, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { site } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-20 sm:py-28">
      <div className="container-content">
        <ScrollReveal>
          <p className="eyebrow mb-4">Contact</p>
          <h2 className="section-heading max-w-xl">
            Building something? I&apos;m open to new roles and collaborations.
          </h2>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-3 font-display text-2xl font-medium text-paper transition-colors hover:text-signal sm:text-3xl"
          >
            <Mail size={24} className="text-signal" />
            {site.email}
          </a>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-fog transition-colors hover:text-signal"
            >
              <Github size={20} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-fog transition-colors hover:text-signal"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={site.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="text-fog transition-colors hover:text-signal"
            >
              <Twitter size={20} />
            </a>
            <span className="mx-1 h-4 w-px bg-line" />
            <a
              href={site.resumeUrl}
              download
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-fog transition-colors hover:text-signal"
            >
              Résumé
              <ArrowDownToLine size={14} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
