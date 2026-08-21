import { Shield, CheckCircle, ArrowRight, DollarSign, Globe, Mail, PhoneCall, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";

export default function SafetyCenter() {
  const navigate = useNavigate();

  const guides = [
    {
      icon: DollarSign,
      title: "Upfront Payment & Fee Scams",
      badge: "Critical Threat",
      desc: "Legitimate employers never charge job seekers for registration, training materials, security deposits, or background checks prior to employment.",
      rules: [
        "Never send money via UPI, wire transfer, or crypto to secure an interview or job offer.",
        "Be wary of 'refundable laptop deposits' or mandatory paid training kits.",
        "Report any requester asking for money immediately to JobShield.",
      ],
    },
    {
      icon: Mail,
      title: "Recruiter Email & Domain Impersonation",
      badge: "High Frequency",
      desc: "Scammers frequently register free webmail accounts (@gmail.com, @yahoo.com) or lookalike domains to impersonate real corporate recruiters.",
      rules: [
        "Verify the exact domain extension in the recruiter's email address.",
        "Cross-reference recruiter identities on LinkedIn and official corporate team pages.",
        "Insist on official written communication from corporate email servers.",
      ],
    },
    {
      icon: PhoneCall,
      title: "Informal Messaging Platform Handoffs",
      badge: "Common Pattern",
      desc: "Conducting interviews or job onboarding exclusively over WhatsApp, Telegram, or Signal is a major red flag.",
      rules: [
        "Legitimate organizations conduct interviews via scheduled video conferencing or in person.",
        "Be cautious if a recruiter refuses phone or video calls.",
        "Never click unverified links sent via instant messaging.",
      ],
    },
    {
      icon: Globe,
      title: "Phishing URLs & Lookalike Domains",
      badge: "Technical Risk",
      desc: "Phishing sites often mimic real corporate career pages using cheap top-level domains (.xyz, .top, .site, .info) or unencrypted HTTP protocols.",
      rules: [
        "Always verify that web addresses begin with HTTPS and display valid SSL certificates.",
        "Check domain age using WHOIS lookup tools.",
        "Never type banking passwords or credentials into suspicious URLs.",
      ],
    },
    {
      icon: Lock,
      title: "Identity & Banking Credential Theft",
      badge: "High Severity",
      desc: "Scammers may ask for sensitive banking details, tax forms (SSN/Aadhaar/PAN), or OTPs under the guise of background checks.",
      rules: [
        "Never share bank account login credentials or OTPs with anyone.",
        "Only provide tax and identity documents after receiving a verified, formal offer letter.",
        "Store copies of all communications for evidence.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-sans transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            <span className="font-sans text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
              Safety Center
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-[var(--ink)]">
            JobShield Safety Center
          </h1>
          <p className="text-[var(--ink-dim)] text-[15px] leading-relaxed">
            Essential guidelines, red flags, and preventative steps to protect yourself against employment fraud, phishing, and payment scams.
          </p>
        </div>

        {/* Call to Action Banner */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--line)] bg-[var(--panel)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="font-display font-semibold text-lg text-[var(--ink)]">
              Have a suspicious offer or recruiter message?
            </h2>
            <p className="text-xs text-[var(--ink-dim)]">
              Run it through JobShield's Multi-Type Scanner to evaluate evidence and risk signals.
            </p>
          </div>
          <button
            onClick={() => navigate("/scanner")}
            className="font-sans text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 shadow-xs"
          >
            Launch Scam Scanner <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Educational Guides Grid */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl text-[var(--ink)] border-b border-[var(--line)] pb-4">
            Threat Vectors & Prevention Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((g, idx) => {
              const Icon = g.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl border border-[var(--line)] bg-[var(--panel)] space-y-4 hover:border-indigo-500/50 transition-all shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[var(--panel-secondary)] rounded-xl border border-[var(--line)]">
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md badge-flag">
                      {g.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-semibold text-base text-[var(--ink)]">
                      {g.title}
                    </h3>
                    <p className="text-xs text-[var(--ink-dim)] mt-1.5 leading-relaxed">
                      {g.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--line)] space-y-2.5">
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-bold">
                      Key Safety Rules:
                    </span>
                    <ul className="space-y-2">
                      {g.rules.map((rule, rIdx) => (
                        <li key={rIdx} className="text-xs text-[var(--ink)] flex items-start gap-2 leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <ChatBot />
    </div>
  );
}
