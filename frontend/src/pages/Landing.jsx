import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Globe,
  Briefcase,
  MessageSquare,
  CreditCard,
  UserCheck,
  Activity,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import ScannerForm from "../components/ScannerForm";
import RiskCard from "../components/RiskCard";

/* Layered Sophisticated Modern SaaS Security Visual */
function SecurityCoreVisual() {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center mx-auto my-4 select-none">
      {/* Soft Gradient Sphere background */}
      <div className="absolute inset-0 bg-radial from-indigo-500/10 via-blue-500/5 to-transparent blur-[70px] pointer-events-none opacity-80" />

      {/* Orbit Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-dashed border-[var(--line)] pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-16 rounded-full border border-[var(--line)] pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-indigo-500 shadow-lg" />
        <div className="absolute bottom-0 right-1/4 w-2 h-2 rounded-full bg-blue-500 shadow-lg" />
      </motion.div>

      {/* Scanning Radar Wave */}
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-28 rounded-full bg-gradient-to-tr from-indigo-500/15 via-blue-500/5 to-transparent border border-indigo-500/20 pointer-events-none"
      />

      {/* Main Core Shield Panel */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-40 h-40 rounded-3xl bg-[var(--panel)] border border-[var(--line)] shadow-xl flex flex-col items-center justify-center gap-3"
      >
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-xs">
          <Shield className="w-7 h-7 text-indigo-600 dark:text-indigo-400" strokeWidth={2} />
        </div>
        <div className="text-center space-y-0.5">
          <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--ink-dim)] font-bold block">
            Scan Engine
          </span>
          <span className="font-sans text-[10px] text-emerald-500 font-semibold block">Active Protection</span>
        </div>
      </motion.div>

      {/* Floaters */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-4 z-20 px-3 py-2 rounded-xl bg-[var(--panel)] border border-[var(--line)] shadow-md flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <div className="flex flex-col">
          <span className="font-sans text-[9px] text-[var(--ink-dim)] uppercase tracking-wider font-semibold">AI Auditor</span>
          <span className="font-sans text-[11px] font-bold text-[var(--ink)]">Analyzing patterns...</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 -right-2 z-20 px-3.5 py-2 rounded-xl bg-[var(--panel)] border border-[var(--line)] shadow-md flex items-center gap-2.5"
      >
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        <div className="flex flex-col">
          <span className="font-sans text-[9px] text-[var(--ink-dim)] uppercase tracking-wider font-semibold">Risk Alert</span>
          <span className="font-sans text-[11px] font-bold text-amber-500">Urgency detected</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-4 z-20 px-3.5 py-2 rounded-xl bg-[var(--panel)] border border-[var(--line)] shadow-md flex items-center gap-2.5"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <div className="flex flex-col">
          <span className="font-sans text-[9px] text-[var(--ink-dim)] uppercase tracking-wider font-semibold">Verification</span>
          <span className="font-sans text-[11px] font-bold text-emerald-500">Domain authentic</span>
        </div>
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
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-x-hidden font-sans transition-colors duration-300">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-indigo-500/5 via-blue-500/0 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-sans text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                Smart Job Scam Protection
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="space-y-3"
            >
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--ink)] leading-[1.12]">
                Protecting You from
              </h1>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent leading-[1.12]">
                Employment Fraud.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.16 }}
              className="text-[var(--ink-dim)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
            >
              Verify recruiters, identify fake job postings, audit payment requests, and analyze suspicious links with our advanced, automated scam scanner.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={scrollToScanner}
                className="w-full sm:w-auto group font-sans text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                Launch Live Scan
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollToHowItWorks}
                className="w-full sm:w-auto font-sans text-xs border border-[var(--line)] bg-[var(--panel)] hover:bg-[var(--panel-secondary)] text-[var(--ink)] px-7 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer font-bold shadow-xs"
              >
                How It Works
              </button>
            </motion.div>
          </div>

          {/* Right Core Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <SecurityCoreVisual />
          </motion.div>
        </section>

        {/* Embedded Scanner Section */}
        <section id="scanner-section" className="py-20 border-y border-[var(--line)] bg-[var(--panel)]/40 backdrop-blur-xs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center space-y-2.5">
              <span className="font-sans text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                Verification Sandbox
              </span>
              <h2 className="font-display font-bold text-3xl tracking-tight text-[var(--ink)]">
                Check details in real-time.
              </h2>
              <p className="text-[var(--ink-dim)] text-[14px] max-w-xl mx-auto">
                Paste suspicious emails, job offers, urls or recruiter details below to generate a scam analysis report.
              </p>
            </div>

            {/* Form */}
            <ScannerForm
              isLoading={false}
              onSubmit={async (type, res) => {
                setScanResult(res.scan);
              }}
            />

            {/* Results Reveal */}
            {scanResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="pt-4"
              >
                <RiskCard scan={scanResult} onReset={() => setScanResult(null)} />
              </motion.div>
            )}
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-24 border-b border-[var(--line)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="max-w-xl space-y-2.5">
              <span className="font-sans text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                Key Protections
              </span>
              <h2 className="font-display font-bold text-3xl tracking-tight text-[var(--ink)]">
                Keep scams out of your workflow.
              </h2>
              <p className="text-[var(--ink-dim)] text-[14px]">
                JobShield evaluates key parameters to ensure communications and work offers are legitimate.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Heuristic Check", icon: Activity, desc: "Evaluates language patterns, high urgency keywords, and recruiter reputation." },
                { title: "Instant Analysis", icon: Zap, desc: "Delivers concrete, normalized risk levels (0-100) under two seconds." },
                { title: "Multi-Source Search", icon: Layers, desc: "Reviews corporate websites, domain registration records, and social handles." },
                { title: "Actionable Insights", icon: ShieldCheck, desc: "Displays step-by-step risk breakdowns and protective next actions." },
              ].map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl bg-[var(--panel)] border border-[var(--line)] space-y-4 hover:border-indigo-500/55 transition-all shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-display font-semibold text-[15px] text-[var(--ink)]">{cap.title}</h3>
                    <p className="text-[13px] text-[var(--ink-dim)] leading-relaxed">{cap.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="how-it-works" className="py-24 border-b border-[var(--line)] bg-[var(--panel)]/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
            <div className="max-w-xl space-y-2.5">
              <span className="font-sans text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                Verification Steps
              </span>
              <h2 className="font-display font-bold text-3xl tracking-tight text-[var(--ink)]">
                The Scanning Sequence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[1.5px] bg-[var(--line)] z-0" />

              {[
                { n: "01", title: "Intake", desc: "Submit suspicious recruiter chat logs, email threads, job links, or websites." },
                { n: "02", title: "Cross-Reference", desc: "The platform evaluates details against verify checklists and WHOIS databases." },
                { n: "03", title: "AI Assessment", desc: "Identifies hidden scams, credential phishing, and pre-payment conditions." },
                { n: "04", title: "Scoring Verdict", desc: "Get a plain-language safety classification and targeted protective actions." },
              ].map((step, idx) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="space-y-4 p-6 rounded-2xl bg-[var(--panel)] border border-[var(--line)] relative z-10 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                      {step.n}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  </div>
                  <h3 className="font-display font-semibold text-[16px] text-[var(--ink)] pt-1">{step.title}</h3>
                  <p className="text-[13px] text-[var(--ink-dim)] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="py-24 border-b border-[var(--line)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
            <div className="max-w-xl space-y-2.5">
              <span className="font-sans text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                Advanced Features
              </span>
              <h2 className="font-display font-bold text-3xl tracking-tight text-[var(--ink)]">
                Analyze threat telemetry.
              </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 p-8 rounded-3xl bg-[var(--panel)] border border-[var(--line)] shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[var(--ink)]">Automated Language Auditing</h3>
                  <p className="text-[var(--ink-dim)] text-[14.5px] leading-relaxed max-w-lg">
                    Our language model evaluates pressure tactics, unverified credential checks, upfront kit payments, and quick onboarding requests to calculate risk indicators.
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                  <span>99% Safe Classification Accuracy</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[var(--panel)] border border-[var(--line)] shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[var(--ink)]">Heuristic Scoring</h3>
                  <p className="text-[var(--ink-dim)] text-xs leading-relaxed">
                    Evaluates severity flags (Safe, Medium Risk, High Risk, Critical) from 0 to 100.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[var(--panel)] border border-[var(--line)] shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[var(--ink)]">Recruiter Verifier</h3>
                  <p className="text-[var(--ink-dim)] text-xs leading-relaxed">
                    Inspects recruiter handles, matching domains, profile age, and verification indicators.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[var(--panel)] border border-[var(--line)] shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[var(--ink)]">Payment Auditor</h3>
                  <p className="text-[var(--ink-dim)] text-xs leading-relaxed">
                    Checks training fees, onboarding deposits, and direct checks requests.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[var(--panel)] border border-[var(--line)] shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[var(--ink)]">Domain Checker</h3>
                  <p className="text-[var(--ink-dim)] text-xs leading-relaxed">
                    Audits SSL registration dates, host details, and phishing links structure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 relative overflow-hidden bg-[var(--panel)]/10">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--panel)]">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--ink-dim)] font-bold">
                Secure Assessment
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-[var(--ink)]">
              Scan suspicious details now.
            </h2>

            <p className="text-[var(--ink-dim)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Before submitting sensitive information or paying onboarding deposits, generate a free risk audit.
            </p>

            <button
              onClick={scrollToScanner}
              className="font-sans text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              Verify Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--line)] bg-[var(--panel)] py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-[var(--panel)] rounded-[7px] flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <span className="font-display font-bold text-base text-[var(--ink)]">JobShield</span>
            </div>

            <p className="font-sans text-[11px] text-[var(--ink-dim)] font-semibold uppercase tracking-wider">
              Automated fraud protection. © 2026 JobShield.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
