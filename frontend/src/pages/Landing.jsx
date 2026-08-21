import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ArrowRight,
  ArrowUpRight,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  Percent,
  FileCheck2,
  MessageSquareWarning,
  Lock,
  Sparkles,
  RotateCcw,
  Globe,
  Building2,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

/* Animated Counter Component */
function CountUp({ value, duration = 1200, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let raf;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(value * ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* Global Font & Token Injector */
function GlobalLandingStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

      .js-root {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
      }
      .font-display { font-family: 'Space Grotesk', sans-serif; }
      .font-mono { font-family: 'IBM Plex Mono', monospace; }

      .js-nav-scrolled {
        box-shadow: 0 1px 0 rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.04);
      }

      .js-underline {
        position: relative;
      }
      .js-underline::after {
        content: "";
        position: absolute;
        left: 0; right: 100%; bottom: -3px;
        height: 1.5px;
        background: currentColor;
        transition: right 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .js-underline:hover::after { right: 0; }
    `}</style>
  );
}

/* Interactive Case File / Evidence Panel Widget */
const CASE_EXHIBITS = [
  {
    id: "exhibit-a",
    tag: "Exhibit A — Training Fee Demand",
    caseNo: "#JS-2847",
    title: "Remote Data Entry Specialist — Immediate Start",
    salary: "up to $4,200/week",
    fee: "refundable training fee of $89",
    contact: "WhatsApp only — domain registered 11 days ago",
    score: 83,
    verdict: "Flagged",
    verdictClass: "border-[var(--flag)] text-[var(--flag)]",
    factors: [
      { text: "Upfront onboarding fee demand", points: "+40 pts", severe: true },
      { text: "Unusually inflated salary for remote entry role", points: "+25 pts", severe: true },
      { text: "Domain registered under 30 days ago", points: "+18 pts", severe: false },
    ],
  },
  {
    id: "exhibit-b",
    tag: "Exhibit B — Telegram Phishing Invite",
    caseNo: "#JS-9102",
    title: "Unsolicited Senior Manager Outreach",
    salary: "$85/hr guaranteed",
    fee: "personal Telegram handle @global_hr_exec",
    contact: "contact via Telegram — company email invalid",
    score: 94,
    verdict: "Critical Risk",
    verdictClass: "border-rose-600 text-rose-600 dark:text-rose-400 dark:border-rose-400",
    factors: [
      { text: "Redirects to encrypted messaging app (Telegram)", points: "+45 pts", severe: true },
      { text: "Unsolicited offer without prior application", points: "+30 pts", severe: true },
      { text: "Disposable email domain used", points: "+19 pts", severe: false },
    ],
  },
  {
    id: "exhibit-c",
    tag: "Exhibit C — Verified Job Posting",
    caseNo: "#JS-0012",
    title: "Senior Full Stack Engineer — Acme Systems",
    salary: "$140,000 - $170,000/yr",
    fee: "No fees or deposits required",
    contact: "Official Portal: acmesystems.io/careers",
    score: 12,
    verdict: "Cleared",
    verdictClass: "border-[var(--verified)] text-[var(--verified)]",
    factors: [
      { text: "Verified corporate SSL domain active 9+ years", points: "0 pts", severe: false },
      { text: "Standard multi-stage interview pipeline", points: "0 pts", severe: false },
      { text: "No upfront monetary or gift card requests", points: "0 pts", severe: false },
    ],
  },
];

function EvidenceCasePanel() {
  const [activeTab, setActiveTab] = useState(CASE_EXHIBITS[0]);
  const [isSwitching, setIsSwitching] = useState(false);

  const handleSwitchTab = (item) => {
    if (item.id === activeTab.id) return;
    setIsSwitching(true);
    setTimeout(() => {
      setActiveTab(item);
      setIsSwitching(false);
    }, 200);
  };

  return (
    <div className="relative group">
      {/* Real tape corners for physical document case feel */}
      <div className="absolute -top-3 left-8 w-12 h-5 bg-[#EDE9DD]/90 border border-[var(--line)] rotate-[-4deg] shadow-xs z-20 pointer-events-none" />
      <div className="absolute -top-3 right-10 w-12 h-5 bg-[#EDE9DD]/90 border border-[var(--line)] rotate-[3deg] shadow-xs z-20 pointer-events-none" />

      <div className="relative bg-[var(--panel)] border border-[var(--line)] shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300 rounded-lg overflow-hidden">
        {/* Exhibit tabs header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--line)] bg-[#FAF9F5] dark:bg-[#12151D]">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {CASE_EXHIBITS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSwitchTab(item)}
                className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab.id === item.id
                    ? "bg-[var(--ink)] text-[var(--paper)] font-semibold"
                    : "text-[var(--ink-dim)] hover:text-[var(--ink)]"
                }`}
              >
                {item.tag.split(" — ")[0]}
              </button>
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-widest text-[var(--ink-dim)] hidden sm:block">
            {activeTab.caseNo}
          </span>
        </div>

        {/* Case document content */}
        <AnimatePresence mode="wait">
          {isSwitching ? (
            <div className="p-8 text-center text-xs font-mono text-[var(--ink-dim)] uppercase tracking-widest">
              Loading Case File Signals...
            </div>
          ) : (
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-6 space-y-4 text-[13.5px] leading-relaxed text-[var(--ink)]"
            >
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-widest block font-semibold">
                  {activeTab.tag}
                </span>
                <p className="font-display font-semibold text-[17px] text-[var(--ink)] leading-snug">
                  {activeTab.title}
                </p>
              </div>

              <div className="p-4 rounded border border-[var(--line)] bg-[var(--paper)]/60 space-y-2">
                <p>
                  Compensation claimed:{" "}
                  <mark className="bg-[var(--caution-bg)] text-[var(--caution)] font-mono font-semibold px-1 py-0.5 rounded">
                    {activeTab.salary}
                  </mark>
                </p>
                <p>
                  Requirements:{" "}
                  <mark className="bg-[var(--flag-bg)] text-[var(--flag)] font-mono font-semibold px-1 py-0.5 rounded">
                    {activeTab.fee}
                  </mark>
                </p>
                <p className="text-xs text-[var(--ink-dim)]">
                  Contact Protocol: <span className="underline font-mono">{activeTab.contact}</span>
                </p>
              </div>

              {/* Detected factors */}
              <div className="space-y-1.5 pt-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)] block font-semibold">
                  Signal Weights
                </span>
                {activeTab.factors.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 rounded border border-[var(--line)] bg-[var(--panel)]">
                    <span className="flex items-center gap-1.5 text-[var(--ink)]">
                      {f.severe ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-[var(--flag)] flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--verified)] flex-shrink-0" />
                      )}
                      {f.text}
                    </span>
                    <span className="font-mono font-bold text-[var(--flag)]">{f.points}</span>
                  </div>
                ))}
              </div>

              {/* Verdict row */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-widest font-semibold">
                    Risk score:
                  </span>
                  <span className={`font-mono text-xl font-bold ${activeTab.score >= 60 ? "text-[var(--flag)]" : "text-[var(--verified)]"}`}>
                    {activeTab.score}/100
                  </span>
                </div>
                <div
                  className={`font-mono text-[11px] uppercase tracking-widest border-2 px-3 py-1 font-bold rotate-[-6deg] rounded ${activeTab.verdictClass}`}
                >
                  {activeTab.verdict}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Panel Footer */}
        <div className="px-6 py-3 border-t border-[var(--line)] bg-[#FBFAF6] dark:bg-[#12151D] flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)]">
          <span>ScamShield Engine v2.4</span>
          <span className="text-[var(--verified)] font-semibold flex items-center gap-1">
            <Shield className="w-3 h-3" /> Live Evidence Verification
          </span>
        </div>
      </div>
    </div>
  );
}

/* Checklist Data */
const CHECKLIST_ITEMS = [
  {
    id: "01",
    icon: FileSearch,
    title: "Language pattern scan",
    desc: "Flags urgency phrasing, vague titles, fake check demands, and copy lifted from known scam templates.",
  },
  {
    id: "02",
    icon: Percent,
    title: "Multi-signal risk scoring",
    desc: "Weighs every signal against a rule set trained on confirmed fraud reports and active scam networks.",
  },
  {
    id: "03",
    icon: FileCheck2,
    title: "Company & domain verification",
    desc: "Cross-checks domain registration age, SSL validity, corporate email hosts, and contact channels.",
  },
  {
    id: "04",
    icon: MessageSquareWarning,
    title: "Plain-language verdict report",
    desc: "Explains exactly what red flags were detected, why they matter, and actionable steps to protect yourself.",
  },
];

/* Process Step Data */
const STEPS = [
  { n: "01", title: "Submit the posting", desc: "Paste the job description, recruiter message, payment link, or company domain." },
  { n: "02", title: "We open a case", desc: "Every line and domain record is checked against known fraud indicators." },
  { n: "03", title: "Read the verdict", desc: "Get an instant 0–100 risk score with highlighted phrases that triggered it." },
  { n: "04", title: "Decide with confidence", desc: "Apply safely, ask targeted questions, or report fraudulent opportunities." },
];

export default function Landing() {
  const navigate = useNavigate();
  const [scanInput, setScanInput] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/scanner");
    } else {
      navigate("/auth");
    }
  };

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!scanInput.trim()) return;
    if (localStorage.getItem("token")) {
      navigate("/scanner", { state: { initialScanText: scanInput } });
    } else {
      toast.error("Please sign in or register to open a case.");
      navigate("/auth", { state: { initialScanText: scanInput } });
    }
  };

  return (
    <div className="js-root min-h-screen bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--ink)] selection:text-[var(--paper)]">
      <GlobalLandingStyle />

      {/* TOP HEADER / NAVBAR WITH PROMINENT GET STARTED BUTTON */}
      <header
        className={`sticky top-0 z-50 bg-[var(--paper)]/95 backdrop-blur-md border-b border-[var(--line)] transition-all duration-300 ${
          scrolled ? "js-nav-scrolled py-3" : "py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            className="group flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-[var(--ink)] flex items-center justify-center rounded transition-transform duration-300 group-hover:rotate-[-8deg]">
              <Shield className="w-4.5 h-4.5 text-[var(--paper)]" strokeWidth={2} />
            </div>
            <span className="font-display font-bold text-[19px] tracking-tight text-[var(--ink)]">
              ScamShield
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-[var(--ink-dim)]">
            <a href="#checklist" className="js-underline hover:text-[var(--ink)] transition-colors">Checklist</a>
            <a href="#process" className="js-underline hover:text-[var(--ink)] transition-colors">Process</a>
            <a href="#numbers" className="js-underline hover:text-[var(--ink)] transition-colors">Numbers</a>
            <button
              onClick={() => navigate("/safety-center")}
              className="js-underline hover:text-[var(--ink)] transition-colors uppercase cursor-pointer"
            >
              Safety Center
            </button>
          </nav>

          {/* Right Action: PROMINENT GET STARTED BUTTON */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGetStarted}
              className="group font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-2.5 rounded hover:bg-[var(--verified)] active:scale-[0.96] transition-all flex items-center gap-2 cursor-pointer font-semibold shadow-xs"
            >
              Get started
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border border-[var(--line)] rounded bg-[var(--panel)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 border-t border-[var(--line)] bg-[var(--paper)] space-y-3 font-mono text-[11px] uppercase tracking-widest">
            <a href="#checklist" onClick={() => setMobileMenuOpen(false)} className="block py-1">Checklist</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="block py-1">Process</a>
            <a href="#numbers" onClick={() => setMobileMenuOpen(false)} className="block py-1">Numbers</a>
            <button onClick={() => { navigate("/safety-center"); setMobileMenuOpen(false); }} className="block py-1 text-left">Safety Center</button>
            <button
              onClick={() => { handleGetStarted(); setMobileMenuOpen(false); }}
              className="w-full bg-[var(--ink)] text-[var(--paper)] py-2.5 rounded font-semibold text-center mt-2"
            >
              Get started &rarr;
            </button>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        <div className="lg:col-span-7 space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span className="inline-block font-mono text-[10px] uppercase tracking-widest border border-[var(--line)] bg-[var(--panel)] px-3 py-1 rounded text-[var(--ink-dim)] font-semibold">
              Multi-Type Scam Detection & Prevention
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1.08] tracking-tight text-[var(--ink)]"
          >
            Detect scams before they cost you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="text-[var(--ink-dim)] text-[16.5px] leading-relaxed max-w-lg font-normal"
          >
            ScamShield opens an evidence case file on suspicious job postings, recruiter messages, payment demands, company information, and URLs — scoring risks and giving you plain-language explanations.
          </motion.p>

          {/* Quick Case Form */}
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.24 }}
            onSubmit={handleScanSubmit}
            className="group max-w-lg border border-[var(--line)] bg-[var(--panel)] rounded flex items-center shadow-xs transition-all duration-200 focus-within:border-[var(--ink)] focus-within:shadow-md"
          >
            <div className="flex items-center gap-2.5 pl-4 flex-1">
              <Search className="w-4 h-4 text-[var(--ink-dim)] flex-shrink-0 transition-colors group-focus-within:text-[var(--ink)]" />
              <input
                type="text"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder="Paste job title, URL, or sender to open a case..."
                className="w-full py-3.5 text-[14px] bg-transparent focus:outline-none placeholder:text-[var(--ink-dim)]/70 text-[var(--ink)] font-normal"
              />
            </div>
            <button
              type="submit"
              className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-3.5 hover:bg-[var(--verified)] active:scale-[0.96] transition-all flex-shrink-0 cursor-pointer font-semibold"
            >
              Open case
            </button>
          </motion.form>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.32 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-[var(--ink-dim)] pt-1"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--verified)]" /> Real-time scoring
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--verified)]" /> No data retained
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--verified)]" /> Plain-language reports
            </span>
          </motion.div>
        </div>

        {/* Hero Right: Interactive Evidence Case Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <EvidenceCasePanel />
        </motion.div>
      </section>

      {/* CHECKLIST SECTION */}
      <section id="checklist" className="border-y border-[var(--line)] bg-[var(--panel)]">
        <div className="max-w-6xl mx-auto px-6 py-20 space-y-12">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--verified)] font-bold">
              The checklist
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-2 tracking-tight text-[var(--ink)]">
              Four checks, every posting.
            </h2>
            <p className="text-[var(--ink-dim)] mt-2 leading-relaxed text-[15px]">
              Nothing receives a safety verdict until it clears the full verification sequence.
            </p>
          </div>

          <div>
            {CHECKLIST_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="group flex items-start gap-6 py-6 border-t border-[var(--line)] last:border-b relative overflow-hidden transition-colors duration-300 hover:bg-[var(--paper)] cursor-default"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--verified)] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                  <span className="font-mono text-[13px] text-[var(--ink-dim)] w-8 pl-4 pt-1 flex-shrink-0 transition-colors duration-300 group-hover:text-[var(--verified)] font-semibold">
                    {item.id}
                  </span>
                  <Icon
                    className="w-5 h-5 text-[var(--ink)] mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-[var(--verified)]"
                    strokeWidth={1.75}
                  />
                  <div>
                    <h3 className="font-display font-semibold text-[16px] text-[var(--ink)]">{item.title}</h3>
                    <p className="text-[var(--ink-dim)] text-[14px] mt-1 leading-relaxed max-w-md font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="max-w-6xl mx-auto px-6 py-24 space-y-16">
        <div className="max-w-xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--verified)] font-bold">
            The process
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mt-2 tracking-tight text-[var(--ink)]">
            From posting to verdict.
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="hidden md:block absolute top-3 left-[6%] right-[6%] border-t border-dashed border-[var(--line)]" />
          {STEPS.map((s) => (
            <div key={s.n} className="group relative pt-8 transition-transform duration-300 hover:-translate-y-1 cursor-default space-y-2">
              <div className="w-2 h-2 rounded-full bg-[var(--ink)] transition-colors duration-300 group-hover:bg-[var(--verified)]" />
              <span className="font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-widest transition-colors duration-300 group-hover:text-[var(--verified)] font-semibold">
                Step {s.n}
              </span>
              <h3 className="font-display font-semibold text-[16px] text-[var(--ink)]">{s.title}</h3>
              <p className="text-[var(--ink-dim)] text-[13.5px] leading-relaxed font-normal">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NUMBERS SECTION */}
      <section id="numbers" className="bg-[var(--ink-band)] text-[#F0EFE9]">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {[
            { value: 120412, l: "Postings scanned", decimals: 0, suffix: "" },
            { value: 99.8, l: "Detection accuracy", decimals: 1, suffix: "%" },
            { value: 45208, l: "Applicants protected", decimals: 0, suffix: "" },
          ].map((s) => (
            <div key={s.l} className="group px-0 sm:px-10 py-8 sm:py-0 first:pl-0 transition-colors duration-300">
              <p className="font-mono text-4xl sm:text-5xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-[var(--verified-bg)]">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="text-white/60 text-[12px] mt-2 uppercase tracking-widest font-mono font-medium">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-14 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pb-8 border-b border-[var(--line)]">
          <div className="group flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-7 h-7 bg-[var(--ink)] flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-8deg]">
              <Shield className="w-4 h-4 text-[var(--paper)]" />
            </div>
            <span className="font-display font-semibold text-[17px]">ScamShield</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleGetStarted}
              className="group font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-3 rounded hover:bg-[var(--verified)] active:scale-[0.96] transition-all flex items-center gap-2 cursor-pointer font-semibold shadow-xs"
            >
              Get started
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={handleGetStarted}
              className="group font-mono text-[11px] uppercase tracking-widest border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)] px-5 py-3 rounded hover:border-[var(--ink)] transition-all flex items-center gap-1.5 cursor-pointer font-medium"
            >
              Analyze a posting
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        <p className="font-mono text-[11px] text-[var(--ink-dim)] uppercase tracking-widest">
          © 2026 ScamShield — AI Fraud Intelligence Unit
        </p>
      </footer>
    </div>
  );
}
