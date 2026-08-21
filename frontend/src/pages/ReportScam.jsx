import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Send, CheckCircle2 } from "lucide-react";

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
      toast.success("Scam report submitted for investigation.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit scam report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-sans transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="max-w-2xl mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="font-sans text-[10px] uppercase tracking-wider text-red-600 dark:text-red-400 font-bold">
              Threat Intake
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
            Report Suspicious Activity
          </h1>
          <p className="text-[var(--ink-dim)] text-xs font-semibold leading-relaxed">
            Help protect job seekers across the network. Flagged reports are reviewed by JobShield admins and fed into our threat database.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-4 animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h2 className="font-display font-bold text-2xl text-[var(--ink)]">Report Filed Successfully</h2>
            <p className="text-xs text-[var(--ink-dim)] max-w-lg mx-auto leading-relaxed">
              Thank you for contributing to community safety. Our intelligence unit has logged your evidence file.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="font-sans text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all cursor-pointer shadow-xs"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-sm overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-semibold text-[var(--ink-dim)]">
                    Category of Scam *
                  </label>
                  <select
                    value={formData.scamType}
                    onChange={(e) => setFormData({ ...formData, scamType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-[14px] rounded-xl bg-[var(--panel-secondary)] border border-[var(--line)] focus:border-indigo-500 text-[var(--ink)] outline-none cursor-pointer"
                  >
                    <option value="job">Fake Job Posting</option>
                    <option value="message">Phishing Message / DM</option>
                    <option value="payment">Upfront Payment Request</option>
                    <option value="recruiter">Fake Recruiter Profile</option>
                    <option value="url">Malicious URL / Link</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-semibold text-[var(--ink-dim)]">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Alleged Employer Name"
                    className="w-full px-3.5 py-2.5 text-[14px] rounded-xl bg-[var(--panel-secondary)] border border-[var(--line)] focus:border-indigo-500 text-[var(--ink)] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-[var(--ink-dim)]">
                  Recruiter / Contact Information
                </label>
                <input
                  type="text"
                  value={formData.recruiterInfo}
                  onChange={(e) => setFormData({ ...formData, recruiterInfo: e.target.value })}
                  placeholder="e.g. Email address, WhatsApp phone number, or Telegram handle"
                  className="w-full px-3.5 py-2.5 text-[14px] rounded-xl bg-[var(--panel-secondary)] border border-[var(--line)] focus:border-indigo-500 text-[var(--ink)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-[var(--ink-dim)]">
                  Scam Description & Circumstances *
                </label>
                <textarea
                  required
                  rows="5"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail what occurred (e.g. requested $50 registration fee via UPI, sent fake offer letter with Gmail address)..."
                  className="w-full p-4 text-[14px] rounded-xl bg-[var(--panel-secondary)] border border-[var(--line)] focus:border-indigo-500 text-[var(--ink)] outline-none resize-y leading-relaxed font-normal"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-[var(--ink-dim)]">
                  Supporting Evidence / Links / Copy
                </label>
                <textarea
                  rows="3"
                  value={formData.evidence}
                  onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                  placeholder="Paste links, message headers, or text logs..."
                  className="w-full p-4 text-[14px] rounded-xl bg-[var(--panel-secondary)] border border-[var(--line)] focus:border-indigo-500 text-[var(--ink)] outline-none resize-y leading-relaxed font-normal"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-sans text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99] shadow-xs"
                >
                  {isSubmitting ? "Filing Case Report..." : "Submit Scam Report"}
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
