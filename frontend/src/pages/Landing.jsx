import { useEffect, useRef, useState } from "react";
import {
  Shield,
  ArrowRight,
  ArrowUpRight,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileSearch,
  Percent,
  FileCheck2,
  MessageSquareWarning,
} from "lucide-react";

/* ---------- fonts + tokens + keyframes ---------- */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

      .js-root {
        --paper: #F7F7F3;
        --panel: #FFFFFF;
        --ink: #16181D;
        --ink-dim: #5B5F68;
        --line: #E1DFD5;
        --verified: #0E6B55;
        --verified-bg: #E7F1EC;
        --flag: #B3402A;
        --flag-bg: #F7E9E4;
        --caution: #9C6B12;
        --caution-bg: #F3ECDA;
        --ink-band: #14161B;
        font-family: 'Inter', system-ui, sans-serif;
        background: var(--paper);
        color: var(--ink);
      }
      .js-root .font-display { font-family: 'Space Grotesk', sans-serif; }
      .js-root .font-mono { font-family: 'IBM Plex Mono', monospace; }

      @keyframes jsFadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .js-reveal { opacity: 0; }
      .js-reveal.js-in { animation: jsFadeUp 0.6s cubic-bezier(.2,.7,.3,1) forwards; }

      @keyframes jsMark {
        from { clip-path: inset(0 100% 0 0); }
        to { clip-path: inset(0 0 0 0); }
      }
      .js-mark-in { animation: jsMark 0.5s ease-out forwards; }

      @keyframes jsStamp {
        0% { opacity: 0; transform: scale(1.4) rotate(-8deg); }
        70% { opacity: 1; transform: scale(0.96) rotate(-8deg); }
        100% { opacity: 1; transform: scale(1) rotate(-8deg); }
      }
      .js-stamp-in { animation: jsStamp 0.5s cubic-bezier(.2,.8,.3,1) forwards; }

      @media (prefers-reduced-motion: reduce) {
        .js-reveal, .js-mark-in, .js-stamp-in { animation: none !important; opacity: 1 !important; clip-path: none !important; }
      }
    `}</style>
  );
}

/* ---------- scroll reveal wrapper ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`js-reveal ${inView ? "js-in" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- evidence panel (hero signature element) ---------- */
function EvidencePanel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative">
      {/* tape corners */}
      <div className="absolute -top-2 left-8 w-10 h-4 bg-[#EDE9DD]/90 border border-[var(--line)] rotate-[-4deg] shadow-sm z-20" />
      <div className="absolute -top-2 right-10 w-10 h-4 bg-[#EDE9DD]/90 border border-[var(--line)] rotate-[3deg] shadow-sm z-20" />

      <div className="relative bg-[var(--panel)] border border-[var(--line)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        {/* header strip */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--line)]">
          <span className="font-mono text-[10px] tracking-widest text-[var(--ink-dim)] uppercase">
            Exhibit A — Job Posting
          </span>
          <span className="font-mono text-[10px] tracking-widest text-[var(--ink-dim)]">
            #JS-2847
          </span>
        </div>

        {/* document body */}
        <div className="px-6 py-6 space-y-3 text-[13.5px] leading-relaxed text-[var(--ink)]">
          <p className="font-display font-semibold text-[15px]">
            Remote Data Entry Specialist — Immediate Start
          </p>
          <p>
            Earn{" "}
            <mark
              className={`bg-[var(--caution-bg)] text-[var(--caution)] px-0.5 ${mounted ? "js-mark-in" : ""}`}
              style={{ animationDelay: "150ms" }}
            >
              up to $4,200/week
            </mark>{" "}
            working from home. No experience necessary.
          </p>
          <p>
            To secure your position, a{" "}
            <mark
              className={`bg-[var(--flag-bg)] text-[var(--flag)] px-0.5 ${mounted ? "js-mark-in" : ""}`}
              style={{ animationDelay: "500ms" }}
            >
              refundable training fee of $89
            </mark>{" "}
            is required before onboarding.
          </p>
          <p>
            Contact HR directly via{" "}
            <mark
              className={`bg-[var(--flag-bg)] text-[var(--flag)] px-0.5 ${mounted ? "js-mark-in" : ""}`}
              style={{ animationDelay: "850ms" }}
            >
              WhatsApp only
            </mark>{" "}
            — company domain{" "}
            <span
              className={`underline decoration-[var(--verified)] decoration-2 underline-offset-2 ${mounted ? "js-mark-in" : ""}`}
              style={{ animationDelay: "1150ms" }}
            >
              registered 11 days ago
            </span>
            .
          </p>
        </div>

        {/* verdict row */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--line)] bg-[#FBFAF6]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-widest">
              Risk score
            </span>
            <span className="font-mono text-lg font-semibold text-[var(--flag)]">83/100</span>
          </div>
          <div
            className={`font-mono text-[11px] uppercase tracking-widest border-2 border-[var(--flag)] text-[var(--flag)] px-3 py-1 rotate-[-6deg] ${mounted ? "js-stamp-in" : "opacity-0"}`}
          >
            Flagged
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- data ---------- */
const checklist = [
  {
    id: "01",
    icon: FileSearch,
    title: "Language pattern scan",
    desc: "Flags urgency phrasing, vague titles, and copy lifted from known scam templates.",
  },
  {
    id: "02",
    icon: Percent,
    title: "Risk scoring",
    desc: "Weighs every signal against a rule set trained on confirmed fraud reports.",
  },
  {
    id: "03",
    icon: FileCheck2,
    title: "Company verification",
    desc: "Cross-checks domain age, registration records, and contact channels.",
  },
  {
    id: "04",
    icon: MessageSquareWarning,
    title: "Plain-language report",
    desc: "Explains exactly what was found and why it matters — no jargon.",
  },
];

const steps = [
  { n: "01", title: "Submit the posting", desc: "Paste the job description, title, and company name." },
  { n: "02", title: "We open a case", desc: "Every line is checked against known fraud indicators." },
  { n: "03", title: "Read the verdict", desc: "Get a risk score with the exact phrases that triggered it." },
  { n: "04", title: "Decide with confidence", desc: "Apply, ask questions, or walk away — the call is yours." },
];

/* ---------- main component ---------- */
export default function JobShieldLandingPreview() {
  return (
    <div className="js-root min-h-screen">
      <GlobalStyle />

      {/* NAV */}
      <header className="sticky top-0 z-40 bg-[var(--paper)]/95 border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[var(--ink)] flex items-center justify-center">
              <Shield className="w-4 h-4 text-[var(--verified-bg)]" strokeWidth={2} />
            </div>
            <span className="font-display font-semibold text-[17px] tracking-tight">
              ScamShield
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-[var(--ink-dim)]">
            <a href="#checklist" className="hover:text-[var(--ink)] transition-colors">Checklist</a>
            <a href="#process" className="hover:text-[var(--ink)] transition-colors">Process</a>
            <a href="#numbers" className="hover:text-[var(--ink)] transition-colors">Numbers</a>
          </nav>

          <button className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-4 py-2.5 hover:bg-[var(--verified)] transition-colors flex items-center gap-1.5">
            Get started <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-7 space-y-7">
          <Reveal>
            <span className="inline-block font-mono text-[10px] uppercase tracking-widest border border-[var(--line)] px-2.5 py-1 text-[var(--ink-dim)]">
              Multi-Type Scam Detection & Prevention
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display font-semibold text-[2.6rem] sm:text-[3.4rem] leading-[1.05] tracking-tight">
              Detect scams before they cost you.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-[var(--ink-dim)] text-[17px] leading-relaxed max-w-lg">
              ScamShield opens an evidence case file on suspicious job postings, recruiter messages, payment requests, company information, and URLs — scoring risks and giving you plain-language explanations.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <form className="max-w-lg border border-[var(--line)] bg-[var(--panel)] flex items-center">
              <div className="flex items-center gap-2.5 pl-4 flex-1">
                <Search className="w-4 h-4 text-[var(--ink-dim)] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Paste job title or company to open a case..."
                  className="w-full py-3.5 text-[14px] bg-transparent focus:outline-none placeholder:text-[var(--ink-dim)]/70"
                />
              </div>
              <button
                type="submit"
                className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-3.5 hover:bg-[var(--verified)] transition-colors flex-shrink-0"
              >
                Open case
              </button>
            </form>
          </Reveal>

          <Reveal delay={320}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 font-mono text-[11px] uppercase tracking-widest text-[var(--ink-dim)]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--verified)]" /> Real-time scoring
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--verified)]" /> No data retained
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--verified)]" /> Plain-language reports
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <EvidencePanel />
          </Reveal>
        </div>
      </section>

      {/* CHECKLIST */}
      <section id="checklist" className="border-y border-[var(--line)] bg-[var(--panel)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <Reveal>
            <div className="max-w-xl mb-14">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--verified)]">
                The checklist
              </span>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-3 tracking-tight">
                Four checks, every posting.
              </h2>
              <p className="text-[var(--ink-dim)] mt-3 leading-relaxed">
                Nothing gets a verdict until it clears the full sequence.
              </p>
            </div>
          </Reveal>

          <div>
            {checklist.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.id} delay={i * 80}>
                  <div className="group flex items-start gap-6 py-6 border-t border-[var(--line)] last:border-b relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--verified)] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                    <span className="font-mono text-[13px] text-[var(--ink-dim)] w-8 pl-4 pt-1 flex-shrink-0">
                      {item.id}
                    </span>
                    <Icon className="w-5 h-5 text-[var(--ink)] mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                    <div>
                      <h3 className="font-display font-semibold text-[16px]">{item.title}</h3>
                      <p className="text-[var(--ink-dim)] text-[14px] mt-1 leading-relaxed max-w-md">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <div className="max-w-xl mb-16">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--verified)]">
              The process
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-3 tracking-tight">
              From posting to verdict.
            </h2>
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="hidden md:block absolute top-3 left-[6%] right-[6%] border-t border-dashed border-[var(--line)]" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="relative pt-8">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
                <span className="font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-widest">
                  Step {s.n}
                </span>
                <h3 className="font-display font-semibold text-[16px] mt-2">{s.title}</h3>
                <p className="text-[var(--ink-dim)] text-[14px] mt-1.5 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NUMBERS */}
      <section id="numbers" className="bg-[var(--ink-band)] text-[#F0EFE9]">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {[
            { n: "120,412", l: "Postings scanned" },
            { n: "99.8%", l: "Detection accuracy" },
            { n: "45,208", l: "Applicants protected" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100} className="px-0 sm:px-10 py-8 sm:py-0 first:pl-0">
              <p className="font-mono text-4xl sm:text-5xl font-semibold tracking-tight">{s.n}</p>
              <p className="text-white/60 text-[13px] mt-2 uppercase tracking-widest font-mono">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pb-8 border-b border-[var(--line)]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[var(--ink)] flex items-center justify-center">
              <Shield className="w-4 h-4 text-[var(--verified-bg)]" />
            </div>
            <span className="font-display font-semibold text-[16px]">ScamShield</span>
          </div>
          <button className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-3 hover:bg-[var(--verified)] transition-colors flex items-center gap-1.5">
            Analyze a posting <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="font-mono text-[11px] text-[var(--ink-dim)] pt-6 uppercase tracking-widest">
          © 2026 ScamShield — Case log open
        </p>
      </footer>
    </div>
  );
}
