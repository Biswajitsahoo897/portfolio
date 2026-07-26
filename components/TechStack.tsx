import { skills } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function TechStack() {
  return (
    <section id="stack" className="border-t border-line py-20 sm:py-28">
      <div className="container-content">
        <ScrollReveal>
          <p className="eyebrow mb-4">Stack</p>
          <h2 className="section-heading">What I build with</h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <ScrollReveal key={group.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-line bg-surface p-6 h-full">
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-signal">
                  {group.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-paper"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
