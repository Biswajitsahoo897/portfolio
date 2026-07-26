import { journey } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Journey() {
  return (
    <section id="journey" className="border-t border-line py-20 sm:py-28">
      <div className="container-content">
        <ScrollReveal>
          <p className="eyebrow mb-4">Path</p>
          <h2 className="section-heading">How I got here</h2>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, i) => (
            <ScrollReveal key={step.year} delay={i * 0.08}>
              <div className="relative border-t-2 border-line pt-6 pr-6 sm:border-t-0 sm:border-l-2 sm:pl-6 sm:pt-0">
                <span
                  className={`absolute -top-[9px] left-0 h-4 w-4 rounded-full border-2 border-ink sm:top-0 sm:-left-[9px] ${
                    i === journey.length - 1 ? "bg-signal" : "bg-line"
                  }`}
                />
                <span className="font-mono text-xs text-fog">{step.year}</span>
                <h3 className="mt-2 font-display text-lg font-medium text-paper">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">{step.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
