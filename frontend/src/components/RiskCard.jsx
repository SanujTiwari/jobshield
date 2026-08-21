import { ShieldAlert, AlertTriangle, CheckCircle2, ShieldX, Info, Lightbulb, ArrowUpRight, Flag, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function RiskCard({ scan, onReset }) {
  const navigate = useNavigate();
  if (!scan) return null;

  const score = scan.risk_score !== undefined ? scan.risk_score : scan.riskScore || 0;
  const level = scan.risk_level || scan.riskLevel || "Low Risk";
  const factors = scan.risk_factors || scan.riskFactors || [];
  const recommendations = scan.recommendations || [];
  const explanation = scan.ai_explanation || scan.aiExplanation || "";

  const getLevelBadgeClass = (l, s) => {
    if (s >= 81 || l === "Critical Risk") return "bg-[var(--flag-bg)] text-[var(--flag)] border-[var(--flag)]/30 font-bold";
    if (s >= 61 || l === "High Risk") return "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 font-bold";
    if (s >= 41 || l === "Medium Risk") return "bg-[var(--caution-bg)] text-[var(--caution)] border-[var(--caution)]/30 font-bold";
    if (s >= 21 || l === "Low Risk") return "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-800 font-medium";
    return "bg-[var(--verified-bg)] text-[var(--verified)] border-[var(--verified)]/30 font-semibold";
  };

  const getSeverityBadgeClass = (severity) => {
    if (severity === "Critical") return "bg-[var(--flag-bg)] text-[var(--flag)] font-bold";
    if (severity === "High") return "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold";
    if (severity === "Medium") return "bg-[var(--caution-bg)] text-[var(--caution)] font-semibold";
    return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-xl overflow-hidden my-8"
    >
      {/* Header Banner */}
      <div className="p-6 sm:p-8 border-b border-[var(--line)] bg-[var(--paper)]/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Score & Verdict */}
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="7" className="text-[var(--line)]" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="7"
                  stroke={score >= 81 ? "#E11D48" : score >= 61 ? "#F43F5E" : score >= 41 ? "#D97706" : score >= 21 ? "#2563EB" : "#059669"}
                  strokeDasharray="314.15"
                  initial={{ strokeDashoffset: 314.15 }}
                  animate={{ strokeDashoffset: 314.15 - (score / 100) * 314.15 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-extrabold text-[var(--ink)] tracking-tight">{score}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink-dim)]">/ 100</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${getLevelBadgeClass(level, score)}`}>
                  {level}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-wider font-semibold">
                  Official Verdict
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl tracking-tight text-[var(--ink)]">
                {score >= 61 ? "High Risk Scam Detected" : score >= 41 ? "Suspicious Activity Flagged" : "Verified Low Risk Profile"}
              </h2>
              <p className="text-[13px] text-[var(--ink-dim)] leading-relaxed max-w-md">
                Risk score calculated from heuristic scanning, domain telemetry, and known scam databases.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {onReset && (
              <button
                onClick={onReset}
                className="font-mono text-[11px] uppercase tracking-widest bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] px-4 py-2.5 rounded-xl hover:border-[var(--ink-dim)] transition-all cursor-pointer font-medium"
              >
                Analyze Another
              </button>
            )}
            <button
              onClick={() => navigate("/dashboard")}
              className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-2.5 rounded-xl hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer font-semibold shadow-xs"
            >
              View Dashboard <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Explanation Banner */}
      {explanation && (
        <div className="px-6 sm:px-8 py-5 border-b border-[var(--line)] bg-[var(--paper)]/30 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-[var(--panel)] border border-[var(--line)] flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-[13.5px] leading-relaxed text-[var(--ink)]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)] block mb-1 font-bold">
              ScamShield Intelligence Summary
            </span>
            {explanation}
          </div>
        </div>
      )}

      {/* Grid: Risk Factors & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--line)]">
        {/* Left: Risk Factors */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-[16px] tracking-tight flex items-center gap-2 text-[var(--ink)]">
              <ShieldAlert className="w-4 h-4 text-[var(--flag)]" />
              Detected Red Flags & Signals ({factors.length})
            </h3>
            <span className="font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-wider font-semibold">
              Signal Breakdown
            </span>
          </div>

          {factors.length > 0 ? (
            <div className="space-y-3 pt-1">
              {factors.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[var(--line)] bg-[var(--panel)] flex items-start justify-between gap-4 transition-all hover:border-[var(--ink-dim)] shadow-2xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold border border-[var(--line)] px-2 py-0.5 rounded-md bg-[var(--paper)]">
                        {factor.category || "General"}
                      </span>
                      <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md ${getSeverityBadgeClass(factor.severity)}`}>
                        {factor.severity || "Flag"}
                      </span>
                    </div>
                    <p className="text-[13.5px] font-medium text-[var(--ink)] leading-snug">
                      {factor.reason || factor.description || factor}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[var(--flag)] bg-[var(--flag-bg)] px-2.5 py-1 rounded-lg border border-[var(--flag)]/20 flex-shrink-0">
                    +{factor.score || 15} pts
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-[var(--line)] text-center text-[var(--ink-dim)] text-[13.5px] space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[var(--verified)] mx-auto" />
              <p className="font-medium text-[var(--ink)]">No High-Risk Red Flags Detected</p>
              <p className="text-xs text-[var(--ink-dim)]">This opportunity passed all heuristic safety algorithms clean.</p>
            </div>
          )}
        </div>

        {/* Right: Actionable Recommendations */}
        <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 bg-[var(--paper)]/40">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-[16px] tracking-tight flex items-center gap-2 text-[var(--ink)]">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Recommended Safety Actions
            </h3>
            <span className="font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-wider font-semibold">
              Advice
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-[var(--line)] bg-[var(--panel)] shadow-2xs">
                <span className="font-mono text-[10px] font-bold text-[var(--ink-dim)] bg-[var(--paper)] w-5 h-5 rounded-md flex items-center justify-center border border-[var(--line)] flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[13px] text-[var(--ink)] leading-relaxed font-normal">{rec}</p>
              </div>
            ))}
          </div>

          {/* Report Button */}
          <div className="pt-4 border-t border-[var(--line)]">
            <button
              onClick={() => navigate("/report-scam", { state: { scan } })}
              className="w-full font-mono text-[11px] uppercase tracking-widest border border-[var(--flag)]/40 text-[var(--flag)] bg-[var(--flag-bg)] hover:border-[var(--flag)] py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer font-semibold shadow-2xs"
            >
              <Flag className="w-3.5 h-3.5" /> Report Flagged Scam
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
