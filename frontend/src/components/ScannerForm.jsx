import { useState, useEffect } from "react";
import {
  Briefcase,
  MessageSquare,
  CreditCard,
  UserCheck,
  Globe,
  Search,
  Building2,
  FileText,
  DollarSign,
  Mail,
  Phone,
  Link as LinkIcon,
  Send,
  AlertCircle,
} from "lucide-react";

export default function ScannerForm({ onSubmit, isLoading, initialScanText = "" }) {
  const [activeTab, setActiveTab] = useState("job");

  // Form State per scanner
  const [jobForm, setJobForm] = useState({
    title: "",
    companyName: "",
    description: initialScanText || "",
    salary: "",
    email: "",
    phone: "",
    website: "",
  });

  const [messageForm, setMessageForm] = useState({
    message: initialScanText || "",
    senderEmail: "",
    senderPhone: "",
    platform: "WhatsApp",
  });

  const [paymentForm, setPaymentForm] = useState({
    requestText: initialScanText || "",
    amount: "",
    reason: "",
    method: "Bank Transfer",
    senderInfo: "",
  });

  const [recruiterForm, setRecruiterForm] = useState({
    name: initialScanText || "",
    email: "",
    phone: "",
    company: "",
    profileUrl: "",
  });

  const [urlForm, setUrlForm] = useState({
    url: initialScanText || "",
  });

  useEffect(() => {
    if (initialScanText) {
      if (initialScanText.startsWith("http://") || initialScanText.startsWith("https://")) {
        setActiveTab("url");
        setUrlForm({ url: initialScanText });
      } else {
        setJobForm((prev) => ({ ...prev, description: initialScanText }));
      }
    }
  }, [initialScanText]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "job") {
      onSubmit("job", jobForm);
    } else if (activeTab === "message") {
      onSubmit("message", messageForm);
    } else if (activeTab === "payment") {
      onSubmit("payment", paymentForm);
    } else if (activeTab === "recruiter") {
      onSubmit("recruiter", recruiterForm);
    } else if (activeTab === "url") {
      onSubmit("url", urlForm);
    }
  };

  const tabs = [
    { id: "job", label: "Job Scam", icon: Briefcase, desc: "Job postings & descriptions" },
    { id: "message", label: "Message Scam", icon: MessageSquare, desc: "Recruiter & phishing messages" },
    { id: "payment", label: "Payment Request", icon: CreditCard, desc: "Upfront fee & deposit requests" },
    { id: "recruiter", label: "Recruiter Analysis", icon: UserCheck, desc: "Recruiter details & emails" },
    { id: "url", label: "URL Link Scanner", icon: Globe, desc: "Links & website domains" },
  ];

  return (
    <div className="bg-[var(--panel)] border border-[var(--line)] shadow-sm">
      {/* Scanner Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-[var(--line)] divide-x divide-[var(--line)] bg-[#FBFAF6]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 text-left transition-colors cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "bg-[var(--panel)] border-b-2 border-b-[var(--ink)] font-semibold"
                  : "hover:bg-[var(--paper)] text-[var(--ink-dim)]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? "text-[var(--ink)]" : "text-[var(--ink-dim)]"}`} />
                <span className={`font-display text-[13px] tracking-tight ${isActive ? "text-[var(--ink)]" : ""}`}>
                  {tab.label}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--ink-dim)] truncate hidden sm:block">
                {tab.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Form Content */}
      <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">

        {/* 1. Job Scanner Form */}
        {activeTab === "job" && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                  Job Title *
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[var(--ink-dim)] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="e.g. Data Entry Specialist"
                    className="w-full pl-10 pr-4 py-2.5 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                  Company Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[var(--ink-dim)] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={jobForm.companyName}
                    onChange={(e) => setJobForm({ ...jobForm, companyName: e.target.value })}
                    placeholder="e.g. Tech Global Inc."
                    className="w-full pl-10 pr-4 py-2.5 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                Job Description Text *
              </label>
              <textarea
                required
                rows="6"
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                placeholder="Paste the full job posting description text here..."
                className="w-full p-4 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none transition-colors resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Salary Claimed</label>
                <input
                  type="text"
                  value={jobForm.salary}
                  onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                  placeholder="e.g. $4,000/week"
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Recruiter Email</label>
                <input
                  type="email"
                  value={jobForm.email}
                  onChange={(e) => setJobForm({ ...jobForm, email: e.target.value })}
                  placeholder="e.g. hr-tech@gmail.com"
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Company Website</label>
                <input
                  type="text"
                  value={jobForm.website}
                  onChange={(e) => setJobForm({ ...jobForm, website: e.target.value })}
                  placeholder="e.g. techglobal.com"
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. Message Scanner Form */}
        {activeTab === "message" && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                Message Content *
              </label>
              <textarea
                required
                rows="6"
                value={messageForm.message}
                onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                placeholder="Paste the SMS, WhatsApp, Telegram, or email message text..."
                className="w-full p-4 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none transition-colors resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Sender Platform</label>
                <select
                  value={messageForm.platform}
                  onChange={(e) => setMessageForm({ ...messageForm, platform: e.target.value })}
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Telegram">Telegram</option>
                  <option value="SMS">SMS / Text</option>
                  <option value="Email">Email</option>
                  <option value="LinkedIn">LinkedIn DM</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Sender Email</label>
                <input
                  type="email"
                  value={messageForm.senderEmail}
                  onChange={(e) => setMessageForm({ ...messageForm, senderEmail: e.target.value })}
                  placeholder="e.g. recruiter@gmail.com"
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Sender Phone</label>
                <input
                  type="text"
                  value={messageForm.senderPhone}
                  onChange={(e) => setMessageForm({ ...messageForm, senderPhone: e.target.value })}
                  placeholder="e.g. +1 555-0192"
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. Payment Scanner Form */}
        {activeTab === "payment" && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                Payment Request Details *
              </label>
              <textarea
                required
                rows="5"
                value={paymentForm.requestText}
                onChange={(e) => setPaymentForm({ ...paymentForm, requestText: e.target.value })}
                placeholder="Explain what payment is being requested (e.g., registration fee, training charge, laptop deposit)..."
                className="w-full p-4 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none transition-colors resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Requested Amount</label>
                <input
                  type="text"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  placeholder="e.g. $89 or ₹2,000"
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Payment Method</label>
                <select
                  value={paymentForm.method}
                  onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI / GPay">UPI / GPay</option>
                  <option value="Crypto">Crypto (USDT/BTC)</option>
                  <option value="Gift Cards">Gift Cards</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Claimed Reason</label>
                <input
                  type="text"
                  value={paymentForm.reason}
                  onChange={(e) => setPaymentForm({ ...paymentForm, reason: e.target.value })}
                  placeholder="e.g. Refundable onboarding kit"
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. Recruiter Scanner Form */}
        {activeTab === "recruiter" && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                  Recruiter Name *
                </label>
                <input
                  type="text"
                  required
                  value={recruiterForm.name}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-2.5 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                  Recruiter Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={recruiterForm.email}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, email: e.target.value })}
                  placeholder="e.g. sarah.hiring@gmail.com"
                  className="w-full px-4 py-2.5 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Company Affiliation</label>
                <input
                  type="text"
                  value={recruiterForm.company}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, company: e.target.value })}
                  placeholder="e.g. Acme Corp"
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">Phone Number</label>
                <input
                  type="text"
                  value={recruiterForm.phone}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, phone: e.target.value })}
                  placeholder="e.g. +1 555-0199"
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">LinkedIn / Profile URL</label>
                <input
                  type="text"
                  value={recruiterForm.profileUrl}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, profileUrl: e.target.value })}
                  placeholder="e.g. linkedin.com/in/sarah"
                  className="w-full px-3.5 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. URL Scanner Form */}
        {activeTab === "url" && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                Suspicious Link or Website URL *
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-[var(--ink-dim)] absolute left-3.5 top-3.5" />
                <input
                  type="url"
                  required
                  value={urlForm.url}
                  onChange={(e) => setUrlForm({ ...urlForm, url: e.target.value })}
                  placeholder="https://verify-account-now.xyz"
                  className="w-full pl-10 pr-4 py-3 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-mono text-[12px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--verified)] py-3.5 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[var(--paper)]/30 border-t-[var(--paper)] rounded-full animate-spin" />
                Opening Case File...
              </>
            ) : (
              <>
                Open Scam Case File <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
