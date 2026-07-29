import { Award, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { certifications } from "@/lib/data";


export default function Certifications() {
    return (
        <section id="certifications" className=" py-20 sm:py-28">
            <div className="container-content">
                <ScrollReveal>
                    <p className="eyebrow mb-4">Achievements</p>
                    <h2 className="section-heading">Certifications</h2>
                </ScrollReveal>

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {certifications.map((cert, i) => (
                        <ScrollReveal key={cert.title} delay={i * 0.08}>
                            <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex h-full items-start justify-between overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-signal/60 hover:shadow-[0_10px_30px_-15px_rgba(95,225,201,0.2)]"
                            >
                                {/* Sheen overlay */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-signal/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative z-10 flex items-start gap-5">
                                    <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface2 transition-colors duration-300 group-hover:border-signal/60">
                                        <Award size={22} className="text-signal" />
                                    </div>

                                    <div>
                                        <span className="font-mono text-xs text-fog">{cert.year}</span>
                                        <h3 className="mt-1 font-display text-lg font-medium text-paper transition-colors duration-300 group-hover:text-signal">
                                            {cert.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-fog">{cert.issuer}</p>
                                    </div>
                                </div>

                                <ExternalLink
                                    size={18}
                                    className="relative z-10 shrink-0 text-fog transition-all duration-300 group-hover:text-signal group-hover:scale-110"
                                />
                            </a>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}