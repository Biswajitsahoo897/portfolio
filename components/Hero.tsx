import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { site } from "@/lib/data";
import SchemaGraphic from "./SchemaGraphic";
import TypingText from "./TypingText"; // <-- Import the new component

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container-content grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow mb-5">{site.role}</p>
          <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-paper sm:text-5xl lg:text-6xl">
            {site.name}
          </h1>
          
          {/* Typing effect applied here */}
          <p className="mt-6 max-w-lg text-base leading-relaxed text-fog sm:text-lg">
            <TypingText text={site.tagline} speed={35} />
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {/* Primary Button with Glow */}
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(95,225,201,0.6)]"
            >
              <span className="relative z-10">View my work</span>
              <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Outline Button with Sliding Fill */}
            <a
              href={site.resumeUrl}
              download
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:border-signal"
            >
              <span className="absolute inset-0 z-0 translate-y-full bg-signal/10 transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-signal">
                Download résumé
                <ArrowDownToLine size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
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