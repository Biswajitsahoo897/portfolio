import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container-content flex flex-col items-center justify-between gap-3 font-mono text-xs text-fog sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
