import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Flag, Send, Building2, User, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";

import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";
import { submitScamReport } from "../services/reportService";

export default function ReportScam() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialScan = location.state?.scan;

  const [formData, setFormData] = useState({
    scanId: initialScan?.id || null,
    scamType: initialScan?.scan_type || "job",
    companyName: initialScan?.input_data?.companyName || "",
    recruiterInfo: initialScan?.input_data?.email || initialScan?.input_data?.name || "",
    description: initialScan?.ai_explanation || "",
    evidence: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || formData.description.trim().length === 0) {
      toast.error("Please provide a description of the scam opportunity.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitScamReport(formData);
      setSubmitted(true);
      toast.success("Scam report submitted for admin investigation.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit scam report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="js-root min-h-screen bg-[var(--paper)]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="max-w-2xl mb-8 space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest border border-[var(--flag)] px-2.5 py-1 text-[var(--flag)] font-semibold">
            Threat Intelligence Intake
          </span>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
            Report Suspicious Opportunity
          </h1>
          <p className="text-[var(--ink-dim)] text-[14.5px] leading-relaxed">
            Help protect job seekers across the network. Flagged reports are reviewed by ScamShield admins and fed into our threat database.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 border border-[var(--verified)] bg-[var(--verified-bg)] text-center space-y-4 animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-[var(--verified)] mx-auto" />
            <h2 className="font-display font-semibold text-2xl text-[var(--ink)]">Report Filed Successfully</h2>
            <p className="text-[14px] text-[var(--ink)] max-w-lg mx-auto leading-relaxed">
              Thank you for contributing to community safety. Our intelligence unit has logged your evidence file.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-2.5 hover:bg-[var(--verified)] transition-colors cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[var(--panel)] border border-[var(--line)] shadow-sm">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                    Category of Scam *
                  </label>
                  <select
                    value={formData.scamType}
                    onChange={(e) => setFormData({ ...formData, scamType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  >
                    <option value="job">Fake Job Posting</option>
                    <option value="message">Phishing Message / DM</option>
                    <option value="payment">Upfront Payment Request</option>
                    <option value="recruiter">Fake Recruiter Profile</option>
                    <option value="url">Malicious URL / Link</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Alleged Employer Name"
                    className="w-full px-3.5 py-2.5 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">
                  Recruiter / Contact Information
                </label>
                <input
                  type="text"
                  value={formData.recruiterInfo}
                  onChange={(e) => setFormData({ ...formData, recruiterInfo: e.target.value })}
                  placeholder="e.g. Email address, WhatsApp phone number, or Telegram handle"
                  className="w-full px-3.5 py-2.5 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                  Scam Description & Circumstances *
                </label>
                <textarea
                  required
                  rows="5"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail what occurred (e.g. requested $50 registration fee via UPI, sent fake offer letter with Gmail address)..."
                  className="w-full p-4 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none resize-y"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)]">
                  Supporting Evidence / Links / Copy
                </label>
                <textarea
                  rows="3"
                  value={formData.evidence}
                  onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                  placeholder="Paste links, message headers, or text logs..."
                  className="w-full p-4 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none resize-y"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-mono text-[11px] uppercase tracking-widest bg-[var(--flag)] text-[var(--paper)] hover:bg-[var(--ink)] py-3.5 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Filing Case Report..." : "Submit Scam Report"} <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <ChatBot />
    </div>
  );
}
