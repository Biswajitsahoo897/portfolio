import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { site } from "@/lib/data";
import SchemaGraphic from "./SchemaGraphic";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container-content grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow mb-5">{site.role}</p>
          <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-paper sm:text-5xl lg:text-6xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-fog sm:text-lg">
            {site.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5"
            >
              View my work
              <ArrowRight size={14} />
            </a>
            <a
              href={site.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:border-signal hover:text-signal"
            >
              Download résumé
              <ArrowDownToLine size={14} />
            </a>
          </div>
        </div>

        <div className="relative mx-auto hidden h-[340px] w-full max-w-md opacity-90 lg:block xl:h-[420px]">
          <SchemaGraphic />
        </div>
      </div>
    </section>
  );
}
