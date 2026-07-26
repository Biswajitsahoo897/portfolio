"use client";

import { useRef, useState, MouseEvent } from "react";
import ScrollReveal from "./ScrollReveal";

// Array of technologies with proper labels
const techStack = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "js", label: "JavaScript" },
  { id: "ts", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "tailwindcss", label: "Tailwind" },
  { id: "nodejs", label: "Node.js" },
  { id: "mysql", label: "MySQL" },
  { id: "mongodb", label: "MongoDB" },
  { id: "postgres", label: "PostgreSQL" },
  { id: "python", label: "Python" },
  { id: "flask", label: "Flask" },
  { id: "php", label: "PHP" },
  { id: "c", label: "C" },
  { id: "java", label: "Java" },
];

export default function TechStack() {
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
    <section id="stack" className="border-t border-line py-20 sm:py-28">
      <div className="container-content">
        <ScrollReveal>
          <p className="eyebrow mb-4">Stack</p>
          <h2 className="section-heading">What I know</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative mt-12 overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:border-signal/60 hover:shadow-[0_10px_30px_-15px_rgba(95,225,201,0.2)] sm:p-8"
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

            {/* Responsive Grid of Icons */}
            <div className="relative z-10 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {techStack.map((tech) => (
                <div
                  key={tech.id}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-line bg-surface2 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-signal/60 hover:shadow-[0_8px_15px_-10px_rgba(95,225,201,0.4)]"
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${tech.id}&theme=dark`}
                    alt={tech.label}
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-fog transition-colors duration-300 group-hover:text-paper/80">
                    {tech.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}