import { Shield, AlertTriangle, CheckCircle, HelpCircle, ArrowRight, Lock, DollarSign, Globe, Mail, PhoneCall } from "lucide-react";
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
        "Report any requester asking for money immediately to ScamShield.",
      ],
    },
    {
      icon: Mail,
      title: "Recruiter Email & Domain Impersonation",
      badge: "High Frequency",
      desc: "Scammers frequently register free webmail accounts (@gmail.com, @yahoo.com) or typosquatted lookalike domains to impersonate real corporate recruiters.",
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
      title: "Phishing URLs & Cheap Top-Level Domains",
      badge: "Technical Risk",
      desc: "Phishing sites often mimic real corporate career pages using cheap top-level domains (.xyz, .top, .site, .info) or HTTP protocol.",
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
    <div className="js-root min-h-screen bg-[var(--paper)]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-widest border border-[var(--verified)] px-2.5 py-1 text-[var(--verified)] font-bold">
            Public Safety & Threat Knowledge Hub
          </span>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl tracking-tight text-[var(--ink)]">
            ScamShield Safety Center
          </h1>
          <p className="text-[var(--ink-dim)] text-[16px] leading-relaxed">
            Essential guidelines, red flags, and preventative steps to protect yourself against employment fraud, phishing, and payment scams.
          </p>
        </div>

        {/* Call to Action Banner */}
        <div className="p-6 sm:p-8 border border-[var(--line)] bg-[var(--panel)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="font-display font-semibold text-xl text-[var(--ink)]">
              Have a suspicious offer or recruiter message?
            </h2>
            <p className="text-[13.5px] text-[var(--ink-dim)]">
              Run it through ScamShield's Multi-Type Scanner to evaluate evidence and risk signals.
            </p>
          </div>
          <button
            onClick={() => navigate("/scanner")}
            className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-6 py-3 hover:bg-[var(--verified)] transition-colors flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            Launch Scam Scanner <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Educational Guides Grid */}
        <div className="space-y-6">
          <h2 className="font-display font-semibold text-2xl text-[var(--ink)] border-b border-[var(--line)] pb-4">
            Threat Vectors & Prevention Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((g, idx) => {
              const Icon = g.icon;
              return (
                <div key={idx} className="p-6 border border-[var(--line)] bg-[var(--panel)] space-y-4 hover:border-[var(--ink)] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[var(--paper)] border border-[var(--line)]">
                      <Icon className="w-5 h-5 text-[var(--ink)]" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest bg-[var(--flag-bg)] text-[var(--flag)] border border-[var(--flag)]/20 px-2.5 py-0.5 font-bold">
                      {g.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-semibold text-lg text-[var(--ink)]">
                      {g.title}
                    </h3>
                    <p className="text-[13.5px] text-[var(--ink-dim)] mt-1 leading-relaxed">
                      {g.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--line)] space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                      Key Safety Rules:
                    </span>
                    <ul className="space-y-1.5">
                      {g.rules.map((rule, rIdx) => (
                        <li key={rIdx} className="text-[13px] text-[var(--ink)] flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[var(--verified)] flex-shrink-0 mt-0.5" />
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
