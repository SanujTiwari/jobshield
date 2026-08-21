import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Search,
  FileSearch,
  Percent,
  MessageSquareWarning,
  Lock,
  Sparkles,
  Zap,
  Globe,
  Briefcase,
  MessageSquare,
  CreditCard,
  UserCheck,
  ShieldCheck,
  Activity,
  Cpu,
  Eye,
  Layers,
  ArrowDownCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import ScannerForm from "../components/ScannerForm";
import RiskCard from "../components/RiskCard";

/* Abstract AI Scam Detection Core Component */
function AIScamDetectionCoreVisual() {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg aspect-square flex items-center justify-center mx-auto">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00F5A0]/20 via-[#00D9FF]/15 to-[#7C5CFC]/20 rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" />

      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-dashed border-[#00F5A0]/20 pointer-events-none"
      />

      {/* Middle counter-rotating ring with node ticks */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute inset-12 rounded-full border border-white/10 pointer-events-none flex items-center justify-between p-2"
      >
        <div className="w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_10px_#00F5A0]" />
        <div className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
      </motion.div>

      {/* Inner scanning wave pulse */}
      <motion.div
        animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-20 rounded-full bg-gradient-to-tr from-[#00F5A0]/10 to-[#00D9FF]/10 border border-[#00F5A0]/30 pointer-events-none"
      />

      {/* Central Glowing ScamShield Core */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#0B111A] border border-[#00F5A0]/40 shadow-[0_0_40px_rgba(0,245,160,0.3)] flex flex-col items-center justify-center gap-2 group cursor-pointer"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00F5A0] to-[#00D9FF] p-[1px]">
          <div className="w-full h-full bg-[#05070B] rounded-[15px] flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#00F5A0]" strokeWidth={2.2} />
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#00F5A0] font-bold">
          AI CORE v2
        </span>
      </motion.div>

      {/* Floating Abstract Threat Signals & Cards */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 left-2 z-20 px-3.5 py-2 rounded-xl bg-[#0B111A]/90 border border-white/10 shadow-xl backdrop-blur-md flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-[#00F5A0] animate-ping" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-white font-semibold">
          AI Analysis Active
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -right-4 z-20 px-3.5 py-2 rounded-xl bg-[#0B111A]/90 border border-rose-500/30 shadow-xl backdrop-blur-md flex items-center gap-2"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
        <div className="flex flex-col">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8]">Threat Indicator</span>
          <span className="font-mono text-[11px] font-bold text-rose-400">Risk Flagged</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 right-6 z-20 px-4 py-2.5 rounded-xl bg-[#0B111A]/90 border border-[#00F5A0]/30 shadow-xl backdrop-blur-md flex items-center gap-3"
      >
        <ShieldCheck className="w-4 h-4 text-[#00F5A0]" />
        <div className="flex flex-col">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8]">Clearance</span>
          <span className="font-mono text-[11px] font-bold text-[#00F5A0]">Verified Safe</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 -left-6 z-20 px-3.5 py-2 rounded-xl bg-[#0B111A]/90 border border-cyan-500/30 shadow-xl backdrop-blur-md flex items-center gap-2"
      >
        <Cpu className="w-3.5 h-3.5 text-[#00D9FF]" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-white font-semibold">
          Multi-Signal Heuristic
        </span>
      </motion.div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);

  const scrollToScanner = () => {
    const el = document.getElementById("scanner-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-[#F8FAFC] selection:bg-[#00F5A0] selection:text-[#05070B] overflow-x-hidden">
      {/* Background Depth Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-[#00F5A0]/10 via-[#00D9FF]/5 to-transparent blur-3xl" />
        <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-radial from-[#7C5CFC]/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      </div>

      <div className="relative z-10">
        {/* Floating Navbar */}
        <Navbar />

        {/* 1. HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00F5A0]/30 bg-[#080C13] shadow-[0_0_15px_rgba(0,245,160,0.15)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00F5A0]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#00F5A0] font-bold">
                AI-POWERED SCAM PROTECTION
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
                Think It's a Scam?
              </h1>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight bg-gradient-to-r from-[#00F5A0] via-[#00D9FF] to-[#7C5CFC] bg-clip-text text-transparent leading-[1.08]">
                Let ScamShield Check It.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-[#94A3B8] text-[16.5px] sm:text-[17.5px] leading-relaxed max-w-xl font-normal mx-auto lg:mx-0"
            >
              Analyze suspicious messages, job offers, links, and online content with AI-powered scam detection before you take the risk.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={scrollToScanner}
                className="w-full sm:w-auto group font-mono text-[12px] uppercase tracking-widest bg-gradient-to-r from-[#00F5A0] to-[#00D9FF] text-[#05070B] px-7 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(0,245,160,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                Scan for Scam
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollToHowItWorks}
                className="w-full sm:w-auto font-mono text-[12px] uppercase tracking-widest border border-white/10 bg-[#080C13] text-white px-7 py-4 rounded-xl hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer font-medium"
              >
                How It Works
              </button>
            </motion.div>
          </div>

          {/* Hero Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <AIScamDetectionCoreVisual />
          </motion.div>
        </section>

        {/* 2. SEPARATE SCANNER SECTION */}
        <section id="scanner-section" className="py-20 border-y border-white/10 bg-[#080C13]/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#00F5A0] font-bold">
                Instant Threat Assessment
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white">
                Check Before You Trust.
              </h2>
              <p className="text-[#94A3B8] text-[15px] max-w-xl mx-auto leading-relaxed">
                Analyze suspicious messages, job offers, links, and other content before you take the risk.
              </p>
            </div>

            {/* Scanner Component connected to Real Backend */}
            <ScannerForm
              isLoading={false}
              onSubmit={async (type, data) => {
                // When scan completes inside ScannerForm component, show real results
              }}
            />

            {scanResult && (
              <div className="pt-6">
                <RiskCard scan={scanResult} onReset={() => setScanResult(null)} />
              </div>
            )}
          </div>
        </section>

        {/* 3. CAPABILITIES / TRUST STRIP */}
        <section className="py-20 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="max-w-xl space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#00D9FF] font-bold">
                Platform Capabilities
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white">
                Scams Move Fast. Stay Ahead.
              </h2>
              <p className="text-[#94A3B8] text-[15px] leading-relaxed">
                ScamShield analyzes suspicious signals so you can make safer decisions before clicking, paying, or responding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "AI Risk Analysis", icon: Activity, desc: "Evaluates language patterns, urgency phrasing, and seller reputation." },
                { title: "Instant Detection", icon: Zap, desc: "Provides immediate multi-point risk scores in under two seconds." },
                { title: "Multi-Signal Scanning", icon: Layers, desc: "Cross-checks domain SSL, contact channels, and payment demands." },
                { title: "Safer Decisions", icon: ShieldCheck, desc: "Delivers plain-language threat explanations with action advice." },
              ].map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl bg-[#0B111A] border border-white/10 shadow-xl space-y-3 hover:border-[#00F5A0]/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#080C13] border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#00F5A0]" />
                    </div>
                    <h3 className="font-display font-semibold text-[16px] text-white">{cap.title}</h3>
                    <p className="text-[13px] text-[#94A3B8] leading-relaxed">{cap.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-24 border-b border-white/10 bg-[#080C13]/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
            <div className="max-w-xl space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#00F5A0] font-bold">
                System Workflow
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white">
                How ScamShield Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                { n: "01", title: "Paste or Upload", desc: "Submit suspicious messages, job postings, recruiter DMs, or links." },
                { n: "02", title: "AI Analysis", desc: "Our core engine evaluates heuristics, domain age, and urgency keywords." },
                { n: "03", title: "Threat Detection", desc: "Cross-checks signals against confirmed fraud patterns and payment traps." },
                { n: "04", title: "Risk Decision", desc: "Receive a clear 0–100 Risk Score with explicit safety recommendations." },
              ].map((step, idx) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="space-y-3 p-5 rounded-2xl bg-[#0B111A] border border-white/10 relative"
                >
                  <span className="font-mono text-xs font-bold text-[#05070B] bg-[#00F5A0] px-2.5 py-1 rounded-md inline-block">
                    {step.n}
                  </span>
                  <h3 className="font-display font-semibold text-[17px] text-white pt-1">{step.title}</h3>
                  <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FEATURES GRID SECTION */}
        <section id="features" className="py-24 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
            <div className="max-w-xl space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#7C5CFC] font-bold">
                Complete Protection Engine
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white">
                Engineered to Spot Every Red Flag.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "AI Scam Detection", icon: Cpu, desc: "Neural language evaluation identifies scam templates." },
                { title: "Risk Score Engine", icon: Activity, desc: "0 to 100 risk score breakdown with clear level badges." },
                { title: "Suspicious Pattern Detection", icon: Search, desc: "Flags fake checks, Zelle demands, and Telegram redirects." },
                { title: "Message Analysis", icon: MessageSquare, desc: "Deep scans SMS, WhatsApp, and email outreach." },
                { title: "Job Scam Detection", icon: Briefcase, desc: "Verifies remote offers, compensation claims, and training fees." },
                { title: "Link & URL Analysis", icon: Globe, desc: "Inspects domain age, SSL status, and phishing redirects." },
                { title: "Fraud Signal Detection", icon: AlertTriangle, desc: "Categorizes high, medium, and critical threat levels." },
                { title: "AI Explanation", icon: Sparkles, desc: "Plain-language summary of detected risks and advice." },
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl bg-[#0B111A] border border-white/10 space-y-3 hover:border-[#00D9FF]/40 transition-colors shadow-lg"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#080C13] border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#00D9FF]" />
                    </div>
                    <h3 className="font-display font-semibold text-[16px] text-white">{feat.title}</h3>
                    <p className="text-[13px] text-[#94A3B8] leading-relaxed">{feat.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. AI DETECTION VISUALIZATION SECTION */}
        <section className="py-24 border-b border-white/10 bg-[#080C13]/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
            <div className="text-center space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#00F5A0] font-bold">
                Threat Signal Flow
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white">
                See the Threat Before It Hits.
              </h2>
            </div>

            <div className="p-8 rounded-3xl bg-[#0B111A] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center text-center relative z-10">
                <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#94A3B8]">Step 1</span>
                  <p className="font-display font-semibold text-sm text-white">Suspicious Input</p>
                </div>
                <div className="hidden md:flex justify-center">
                  <ArrowRight className="w-5 h-5 text-[#00F5A0]" />
                </div>
                <div className="p-4 rounded-xl bg-[#05070B] border border-[#00F5A0]/30 space-y-1 shadow-[0_0_15px_rgba(0,245,160,0.1)]">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#00F5A0]">Step 2</span>
                  <p className="font-display font-semibold text-sm text-white">AI Analysis Engine</p>
                </div>
                <div className="hidden md:flex justify-center">
                  <ArrowRight className="w-5 h-5 text-[#00D9FF]" />
                </div>
                <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#00D9FF]">Step 3</span>
                  <p className="font-display font-semibold text-sm text-white">Risk Score & Verdict</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CTA SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0B111A]">
              <ShieldCheck className="w-4 h-4 text-[#00F5A0]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold">
                Instant Protection
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
              Before You Trust It, Scan It.
            </h2>

            <p className="text-[#94A3B8] text-[17px] max-w-xl mx-auto leading-relaxed font-normal">
              Give ScamShield a suspicious message, job offer, or link and find out what the signals say.
            </p>

            <button
              onClick={scrollToScanner}
              className="font-mono text-[12px] uppercase tracking-widest bg-gradient-to-r from-[#00F5A0] to-[#00D9FF] text-[#05070B] px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(0,245,160,0.4)] transition-all inline-flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              Start Scanning
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 8. FOOTER */}
        <footer className="border-t border-white/10 bg-[#080C13] py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#00F5A0] to-[#00D9FF] p-[1px]">
                <div className="w-full h-full bg-[#05070B] rounded-[7px] flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-[#00F5A0]" />
                </div>
              </div>
              <span className="font-display font-bold text-[16px] text-white">ScamShield</span>
            </div>

            <p className="font-mono text-[11px] text-[#94A3B8] uppercase tracking-widest">
              AI-powered protection against scams. © 2026 ScamShield.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
