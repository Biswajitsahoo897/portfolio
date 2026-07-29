"use client";

import { useRef, useState, MouseEvent } from "react";
import { journey } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Journey() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <section id="journey" className=" py-20 sm:py-28">
      <div className="container-content">
        <ScrollReveal>
          <p className="eyebrow mb-4">Journey</p>
          <h2 className="section-heading">How I got here</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative mt-12 overflow-hidden rounded-2xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-signal/60 hover:shadow-[0_10px_30px_-15px_rgba(95,225,201,0.2)] sm:p-10"
          >
            {/* Spotlight overlay */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
              style={{
                opacity: isHovering ? 1 : 0,
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(95, 225, 201, 0.08), transparent 40%)`,
              }}
            />
            
            {/* Sheen overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-signal/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Timeline Grid */}
            <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {journey.map((step, i) => (
                <div 
                  key={step.year} 
                  className="group/sub relative border-l-2 border-line pl-6 transition-colors duration-300 hover:border-signal/50"
                >
                  <span
                    className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-ink transition-all duration-300 group-hover/sub:scale-150 group-hover/sub:border-signal ${
                      i === journey.length - 1 ? "bg-signal" : "bg-line group-hover/sub:bg-signal"
                    }`}
                  />
                  <span className="font-mono text-xs text-fog">{step.year}</span>
                  <h3 className="mt-2 font-display text-lg font-medium text-paper transition-colors duration-300 group-hover/sub:text-signal">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}