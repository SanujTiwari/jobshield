import { useEffect, useState } from "react";
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
  Zap,
  Globe,
  CreditCard,
  UserCheck,
  Briefcase,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

/* Sample presets for interactive live preview */
const PRESETS = [
  {
    id: "payment",
    label: "Training Fee Demand",
    type: "Job Scam",
    score: 84,
    level: "High Risk",
    title: "Remote Data Entry Specialist ($45/hr)",
    snippet: "Requirements: Earn $4,200/week working from home. A refundable training fee of $89 is required via Zelle before equipment dispatch.",
    factors: [
      { text: "Upfront fee requirement before hiring", points: "+40 pts", critical: true },
      { text: "Unusually high compensation for entry level", points: "+25 pts", critical: true },
      { text: "Payment via non-reversible channel (Zelle)", points: "+19 pts", critical: false },
    ],
    domain: "Registered 6 days ago (Privacy Guarded)",
  },
  {
    id: "recruiter",
    label: "Telegram Recruiter",
    type: "Phishing",
    score: 92,
    level: "Critical Risk",
    title: "Unsolicited WhatsApp / Telegram HR Invite",
    snippet: "Hello! I am Sarah from Global HR. Your resume was selected for a remote manager role ($80/hr). Contact us on Telegram @hr_global_exec immediately.",
    factors: [
      { text: "Off-platform communication redirect (Telegram)", points: "+45 pts", critical: true },
      { text: "Unsolicited offer without prior application", points: "+30 pts", critical: true },
      { text: "Vague company entity details", points: "+17 pts", critical: false },
    ],
    domain: "Free email domain used (@gmail.com)",
  },
  {
    id: "legit",
    label: "Verified Opportunity",
    type: "Legitimate",
    score: 12,
    level: "Low Risk",
    title: "Frontend Engineer — Acme Systems Inc.",
    snippet: "Acme Systems is seeking a Senior React Developer. Applications strictly accepted via our official career portal at acmesystems.io/careers.",
    factors: [
      { text: "Official corporate domain match", points: "0 pts", critical: false },
      { text: "Standard interview pipeline outline", points: "0 pts", critical: false },
      { text: "No upfront financial demands", points: "0 pts", critical: false },
    ],
    domain: "Domain active 11 years (Verified SSL)",
  },
];

/* Animated Counter */
function CountUp({ value, duration = 1.2, decimals = 0, suffix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * easeOut);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span>
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* Interactive Live Scanner Preview Widget */
function LiveScannerWidget() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);

  const handleSelect = (preset) => {
    if (preset.id === selectedPreset.id) return;
    setIsScanning(true);
    setTimeout(() => {
      setSelectedPreset(preset);
      setIsScanning(false);
    }, 350);
  };

  return (
    <div className="relative rounded-2xl bg-[var(--panel)] border border-[var(--line)] shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-[var(--line)] bg-[var(--paper)]/50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-dim)] font-semibold">
            Live Scanner Preview
          </span>
        </div>
        <div className="flex items-center gap-1 bg-[var(--paper)] p-1 rounded-lg border border-[var(--line)] w-full sm:w-auto overflow-x-auto">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`px-3 py-1 rounded-md font-mono text-[10px] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedPreset.id === p.id
                  ? "bg-[var(--ink)] text-[var(--paper)] font-semibold shadow-xs"
                  : "text-[var(--ink-dim)] hover:text-[var(--ink)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main card body */}
      <div className="p-6 space-y-5">
        <AnimatePresence mode="wait">
          {isScanning ? (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center space-y-3"
            >
              <div className="w-8 h-8 rounded-full border-2 border-[var(--ink)] border-t-transparent animate-spin mx-auto" />
              <p className="font-mono text-xs text-[var(--ink-dim)] uppercase tracking-widest">
                Analyzing Heuristics & Signals...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedPreset.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Title & snippet */}
              <div className="space-y-2 p-4 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)]">
                    Scan Input
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--panel)] border border-[var(--line)] text-[var(--ink-dim)]">
                    {selectedPreset.type}
                  </span>
                </div>
                <h4 className="font-display font-semibold text-[15px] text-[var(--ink)]">
                  {selectedPreset.title}
                </h4>
                <p className="text-[13px] text-[var(--ink-dim)] leading-relaxed italic">
                  "{selectedPreset.snippet}"
                </p>
              </div>

              {/* Score & Verdict banner */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--paper)]/80 border border-[var(--line)]">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="4.5" className="text-[var(--line)]" />
                      <circle
                        cx="30"
                        cy="30"
                        r="24"
                        fill="none"
                        strokeWidth="4.5"
                        stroke={selectedPreset.score >= 60 ? "#E11D48" : "#059669"}
                        strokeDasharray={`${(selectedPreset.score / 100) * 150.79} 150.79`}
                        strokeLinecap="round"
                        className="transition-all duration-700"
                      />
                    </svg>
                    <span className="absolute font-mono text-sm font-bold text-[var(--ink)]">
                      {selectedPreset.score}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)]">
                      Risk Index
                    </span>
                    <h5
                      className={`font-display font-bold text-base ${
                        selectedPreset.score >= 60 ? "text-[var(--flag)]" : "text-[var(--verified)]"
                      }`}
                    >
                      {selectedPreset.level}
                    </h5>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)] block">
                    Domain Status
                  </span>
                  <span className="font-mono text-[11px] font-medium text-[var(--ink)]">
                    {selectedPreset.domain}
                  </span>
                </div>
              </div>

              {/* Key detected factors */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)] block font-semibold">
                  Detected Red Flags & Signals
                </span>
                <div className="space-y-1.5">
                  {selectedPreset.factors.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel)] text-[12.5px]"
                    >
                      <div className="flex items-center gap-2">
                        {f.critical ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-[var(--flag)] flex-shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--verified)] flex-shrink-0" />
                        )}
                        <span className="text-[var(--ink)]">{f.text}</span>
                      </div>
                      <span
                        className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                          f.critical ? "bg-[var(--flag-bg)] text-[var(--flag)]" : "bg-[var(--paper)] text-[var(--ink-dim)]"
                        }`}
                      >
                        {f.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card footer */}
      <div className="px-6 py-3 border-t border-[var(--line)] bg-[var(--paper)]/50 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)]">
        <span>ScamShield Engine v2.4</span>
        <span className="flex items-center gap-1 text-[var(--verified)] font-semibold">
          <Shield className="w-3 h-3" /> Encrypted & Private
        </span>
      </div>
    </div>
  );
}

/* Feature Matrix Data */
const FEATURES = [
  {
    icon: FileSearch,
    title: "Language & Urgency Scanner",
    desc: "Scans descriptions and messages for known high-pressure tactics, fake check demands, and suspicious pay scales.",
  },
  {
    icon: Percent,
    title: "Multi-Source Risk Scoring",
    desc: "Algorithms evaluate job metadata, offer text, and communication channels against a database of confirmed fraud cases.",
  },
  {
    icon: Globe,
    title: "Domain & Entity Verification",
    desc: "Cross-checks registration records, SSL age, company domain matches, and recruiter email legitimacy.",
  },
  {
    icon: MessageSquareWarning,
    title: "Plain-Language Verdicts",
    desc: "Provides clear human-readable explanations — pinpointing exactly which sentences triggered flags and why.",
  },
];

/* Step Workflow Data */
const STEPS = [
  { n: "01", title: "Submit Any Details", desc: "Paste job descriptions, recruiter text, payment links, or sender handles." },
  { n: "02", title: "Deep Signal Audit", desc: "Our engine checks patterns across domain registries and scam intelligence networks." },
  { n: "03", title: "Receive Risk Verdict", desc: "Get an instant 0–100 Risk Score with weighted red flag highlights." },
  { n: "04", title: "Proceed Safely", desc: "Apply with full confidence, report fraudulent offers, or walk away safely." },
];

export default function Landing() {
  const navigate = useNavigate();
  const [scanInput, setScanInput] = useState("");

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!scanInput.trim()) return;
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/scanner", { state: { initialScanText: scanInput } });
    } else {
      toast.error("Please sign in to analyze scam cases.");
      navigate("/auth", { state: { initialScanText: scanInput } });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--ink)] selection:text-[var(--paper)]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 border-b border-[var(--line)]">
        {/* Subtle background gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/5 via-blue-500/5 to-transparent pointer-events-none blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--panel)] shadow-xs"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-dim)] font-semibold">
                  AI Fraud Intelligence Engine
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[var(--ink)]"
              >
                Detect job & hiring scams <span className="text-[var(--ink-dim)] underline decoration-[var(--line)] underline-offset-8">before</span> they cost you.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-[17px] text-[var(--ink-dim)] leading-relaxed max-w-xl font-normal"
              >
                ScamShield analyzes job descriptions, recruiter messages, payment demands, and company domains in real time — generating instant risk scores with plain-language evidence.
              </motion.p>

              {/* Quick Input Bar */}
              <motion.form
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                onSubmit={handleScanSubmit}
                className="p-1.5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-md flex items-center gap-2 max-w-xl focus-within:border-[var(--ink)] transition-all"
              >
                <div className="flex items-center gap-3 pl-4 flex-1">
                  <Search className="w-4 h-4 text-[var(--ink-dim)] flex-shrink-0" />
                  <input
                    type="text"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    placeholder="Paste job posting, message, or company URL..."
                    className="w-full py-3 text-[14px] bg-transparent outline-none placeholder:text-[var(--ink-dim)]/70 text-[var(--ink)]"
                  />
                </div>
                <button
                  type="submit"
                  className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-3.5 rounded-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer font-semibold shadow-xs"
                >
                  Analyze Case
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.form>

              {/* Trust micro-badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] pt-1"
              >
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Zero data retained
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Real-time heuristic check
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Instant PDF report
                </span>
              </motion.div>
            </div>

            {/* Hero Right Widget Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <LiveScannerWidget />
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST & METRICS STRIP */}
      <section className="border-b border-[var(--line)] bg-[var(--panel)]/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
            <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-0">
              <div className="p-3 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                <FileSearch className="w-5 h-5 text-[var(--ink)]" />
              </div>
              <div>
                <h4 className="font-mono text-2xl font-bold text-[var(--ink)]">
                  <CountUp value={124800} />+
                </h4>
                <p className="text-[13px] text-[var(--ink-dim)] mt-0.5 font-medium">
                  Scam patterns & listings analyzed
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-6 md:pt-0 md:pl-8">
              <div className="p-3 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                <Percent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-mono text-2xl font-bold text-[var(--ink)]">
                  <CountUp value={99.8} decimals={1} suffix="%" />
                </h4>
                <p className="text-[13px] text-[var(--ink-dim)] mt-0.5 font-medium">
                  Multi-signal detection accuracy
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-6 md:pt-0 md:pl-8">
              <div className="p-3 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="font-mono text-2xl font-bold text-[var(--ink)]">
                  <CountUp value={48500} />+
                </h4>
                <p className="text-[13px] text-[var(--ink-dim)] mt-0.5 font-medium">
                  Job seekers protected from financial loss
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES / CHECKLIST GRID */}
      <section className="py-24 border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--verified)] font-bold">
              Multi-Layer Defense System
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
              Four protective checks on every scan.
            </h2>
            <p className="text-[var(--ink-dim)] text-[16px] leading-relaxed font-normal">
              Every job listing, recruiter text, or payment request undergoes a rigorous multi-signal evaluation before a final risk clearance verdict is issued.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl bg-[var(--panel)] border border-[var(--line)] shadow-xs space-y-4 flex flex-col justify-between hover:border-[var(--ink-dim)] transition-colors"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--ink)]" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-display font-semibold text-[17px] text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] text-[var(--ink-dim)] leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)]">
                    <span>Check 0{idx + 1}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--verified)]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="py-24 border-b border-[var(--line)] bg-[var(--panel)]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--verified)] font-bold">
              Simple Case Intake
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
              From suspicious posting to clear verdict in seconds.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {STEPS.map((s, i) => (
              <div key={s.n} className="space-y-4 relative">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[var(--paper)] bg-[var(--ink)] px-2.5 py-1 rounded-md">
                    {s.n}
                  </span>
                  <div className="h-px bg-[var(--line)] flex-1 hidden md:block" />
                </div>
                <h3 className="font-display font-semibold text-[17px] text-[var(--ink)]">
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-[var(--ink-dim)] leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--panel)] shadow-xs">
            <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-dim)] font-semibold">
              Instant Fraud Protection
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-[var(--ink)]">
            Don't leave your career security to chance.
          </h2>

          <p className="text-[17px] text-[var(--ink-dim)] max-w-xl mx-auto leading-relaxed font-normal">
            Analyze any questionable job offer, Telegram recruiter invite, or training fee demand before responding.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-7 py-4 rounded-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-semibold shadow-md cursor-pointer"
            >
              Open a Scam Shield Case
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/safety-center")}
              className="w-full sm:w-auto font-mono text-[11px] uppercase tracking-widest border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)] px-7 py-4 rounded-xl hover:border-[var(--ink-dim)] transition-all flex items-center justify-center gap-2 cursor-pointer font-medium"
            >
              Explore Safety Center
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--line)] bg-[var(--panel)]/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[var(--ink)] flex items-center justify-center shadow-xs">
              <Shield className="w-4 h-4 text-[var(--paper)]" />
            </div>
            <span className="font-display font-bold text-[16px] text-[var(--ink)]">
              ScamShield
            </span>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-dim)]">
            © 2026 ScamShield — AI Fraud Intelligence Unit
          </p>
        </div>
      </footer>
    </div>
  );
}
