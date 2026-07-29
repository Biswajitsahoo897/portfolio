import { about, site } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28"> 
    {/* removed the border line -> border-t border-line */}
      <div className="container-content">
        <ScrollReveal>
          <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-signal/60 hover:shadow-[0_10px_30px_-15px_rgba(95,225,201,0.2)] sm:p-10">
            
            {/* Sheen overlay (same as Projects) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-signal/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.4fr_0.6fr]">
              <div>
                <p className="eyebrow mb-4">About</p>
                <h2 className="section-heading">Who&apos;s building this</h2>
                <p className="mt-4 font-mono text-xs text-fog">{site.location}</p>
              </div>

              <div className="space-y-5">
                {about.paragraphs.map((p, i) => (
                  <p 
                    key={i} 
                    className="text-base leading-relaxed text-fog sm:text-lg transition-colors duration-300 group-hover:text-paper/90"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
            
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}