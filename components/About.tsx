import { about, site } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="border-t border-line py-20 sm:py-28">
      <div className="container-content grid grid-cols-1 gap-10 lg:grid-cols-[0.4fr_0.6fr]">
        <ScrollReveal>
          <p className="eyebrow mb-4">About</p>
          <h2 className="section-heading">Who&apos;s building this</h2>
          <p className="mt-4 font-mono text-xs text-fog">{site.location}</p>
        </ScrollReveal>

        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-fog sm:text-lg">{p}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
