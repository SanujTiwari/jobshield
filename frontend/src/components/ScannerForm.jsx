import { useState, useEffect } from "react";
import {
  Briefcase,
  MessageSquare,
  CreditCard,
  UserCheck,
  Globe,
  Search,
  Building2,
  Send,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    { id: "job", label: "Job Posting", icon: Briefcase, desc: "Descriptions & Offers" },
    { id: "message", label: "Message / DM", icon: MessageSquare, desc: "WhatsApp & Telegram" },
    { id: "payment", label: "Payment Demand", icon: CreditCard, desc: "Fees & Laptop Deposits" },
    { id: "recruiter", label: "Recruiter Identity", icon: UserCheck, desc: "Sender Email & Profiles" },
    { id: "url", label: "URL Link Scanner", icon: Globe, desc: "Web Domains & Links" },
  ];

  return (
    <div className="bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-xl overflow-hidden">
      {/* Scanner Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-[var(--line)] bg-[var(--paper)]/60 p-1.5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative p-3.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "text-[var(--ink)] font-semibold"
                  : "hover:bg-[var(--panel)]/70 text-[var(--ink-dim)]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-xl bg-[var(--panel)] border border-[var(--line)] shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? "text-[var(--ink)]" : "text-[var(--ink-dim)]"}`} />
                <span className="font-display font-semibold text-[13px] tracking-tight">
                  {tab.label}
                </span>
              </div>
              <span className="relative z-10 font-mono text-[9px] text-[var(--ink-dim)] truncate hidden sm:block">
                {tab.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Form Content */}
      <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">
        <AnimatePresence mode="wait">
          {/* 1. Job Scanner Form */}
          {activeTab === "job" && (
            <motion.div
              key="job"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-bold">
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
                      className="w-full pl-10 pr-4 py-2.5 text-[14px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-bold">
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
                      className="w-full pl-10 pr-4 py-2.5 text-[14px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-bold">
                    Job Description & Offer Text *
                  </label>
                  <button
                    type="button"
                    onClick={() => setJobForm({
                      title: "Remote Data Entry Specialist",
                      companyName: "Global Apex Solutions",
                      description: "Earn up to $4,200/week working from home. No experience necessary. A refundable training fee of $89 is required before onboarding. Contact HR via WhatsApp.",
                      salary: "$4,200/week",
                      email: "hr-apex@gmail.com",
                      phone: "+1 555-0182",
                      website: "apex-solutions-fake.xyz"
                    })}
                    className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1 font-medium"
                  >
                    <Sparkles className="w-3 h-3" /> Fill Scam Example
                  </button>
                </div>
                <textarea
                  required
                  rows="6"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Paste the full job posting description text here..."
                  className="w-full p-4 text-[14px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none transition-colors resize-y leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Salary Claimed</label>
                  <input
                    type="text"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    placeholder="e.g. $4,000/week"
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Recruiter Email</label>
                  <input
                    type="email"
                    value={jobForm.email}
                    onChange={(e) => setJobForm({ ...jobForm, email: e.target.value })}
                    placeholder="e.g. hr-tech@gmail.com"
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Company Website</label>
                  <input
                    type="text"
                    value={jobForm.website}
                    onChange={(e) => setJobForm({ ...jobForm, website: e.target.value })}
                    placeholder="e.g. techglobal.com"
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Message Scanner Form */}
          {activeTab === "message" && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-bold">
                  Message Content *
                </label>
                <textarea
                  required
                  rows="6"
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  placeholder="Paste the SMS, WhatsApp, Telegram, or email message text..."
                  className="w-full p-4 text-[14px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none transition-colors resize-y leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Sender Platform</label>
                  <select
                    value={messageForm.platform}
                    onChange={(e) => setMessageForm({ ...messageForm, platform: e.target.value })}
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Telegram">Telegram</option>
                    <option value="SMS">SMS / Text</option>
                    <option value="Email">Email</option>
                    <option value="LinkedIn">LinkedIn DM</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Sender Email</label>
                  <input
                    type="email"
                    value={messageForm.senderEmail}
                    onChange={(e) => setMessageForm({ ...messageForm, senderEmail: e.target.value })}
                    placeholder="e.g. recruiter@gmail.com"
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Sender Phone</label>
                  <input
                    type="text"
                    value={messageForm.senderPhone}
                    onChange={(e) => setMessageForm({ ...messageForm, senderPhone: e.target.value })}
                    placeholder="e.g. +1 555-0192"
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. Payment Scanner Form */}
          {activeTab === "payment" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-bold">
                  Payment Demand Details *
                </label>
                <textarea
                  required
                  rows="5"
                  value={paymentForm.requestText}
                  onChange={(e) => setPaymentForm({ ...paymentForm, requestText: e.target.value })}
                  placeholder="Explain what payment is being requested (e.g., registration fee, training charge, laptop deposit)..."
                  className="w-full p-4 text-[14px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none transition-colors resize-y leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Requested Amount</label>
                  <input
                    type="text"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                    placeholder="e.g. $89 or ₹2,000"
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Payment Method</label>
                  <select
                    value={paymentForm.method}
                    onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI / GPay">UPI / GPay</option>
                    <option value="Crypto">Crypto (USDT/BTC)</option>
                    <option value="Gift Cards">Gift Cards</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Claimed Reason</label>
                  <input
                    type="text"
                    value={paymentForm.reason}
                    onChange={(e) => setPaymentForm({ ...paymentForm, reason: e.target.value })}
                    placeholder="e.g. Refundable onboarding kit"
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. Recruiter Scanner Form */}
          {activeTab === "recruiter" && (
            <motion.div
              key="recruiter"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-bold">
                    Recruiter Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={recruiterForm.name}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-2.5 text-[14px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-bold">
                    Recruiter Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={recruiterForm.email}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, email: e.target.value })}
                    placeholder="e.g. sarah.hiring@gmail.com"
                    className="w-full px-4 py-2.5 text-[14px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Company Affiliation</label>
                  <input
                    type="text"
                    value={recruiterForm.company}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, company: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">Phone Number</label>
                  <input
                    type="text"
                    value={recruiterForm.phone}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, phone: e.target.value })}
                    placeholder="e.g. +1 555-0199"
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">LinkedIn / Profile URL</label>
                  <input
                    type="text"
                    value={recruiterForm.profileUrl}
                    onChange={(e) => setRecruiterForm({ ...recruiterForm, profileUrl: e.target.value })}
                    placeholder="e.g. linkedin.com/in/sarah"
                    className="w-full px-3.5 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. URL Scanner Form */}
          {activeTab === "url" && (
            <motion.div
              key="url"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-bold">
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
                    className="w-full pl-10 pr-4 py-3 text-[14px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-mono text-[12px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] hover:opacity-95 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-semibold shadow-md active:scale-[0.99]"
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
