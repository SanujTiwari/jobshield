import { ShieldAlert, AlertTriangle, CheckCircle2, ShieldX, Info, Lightbulb, ArrowUpRight, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RiskCard({ scan, onReset }) {
  const navigate = useNavigate();
  if (!scan) return null;

  const score = scan.risk_score !== undefined ? scan.risk_score : scan.riskScore || 0;
  const level = scan.risk_level || scan.riskLevel || "Low Risk";
  const factors = scan.risk_factors || scan.riskFactors || [];
  const recommendations = scan.recommendations || [];
  const explanation = scan.ai_explanation || scan.aiExplanation || "";

  const getLevelBadgeClass = (l, s) => {
    if (s >= 81 || l === "Critical Risk") return "bg-[var(--flag-bg)] text-[var(--flag)] border-[var(--flag)]";
    if (s >= 61 || l === "High Risk") return "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800";
    if (s >= 41 || l === "Medium Risk") return "bg-[var(--caution-bg)] text-[var(--caution)] border-[var(--caution)]";
    if (s >= 21 || l === "Low Risk") return "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-800";
    return "bg-[var(--verified-bg)] text-[var(--verified)] border-[var(--verified)]";
  };

  const getSeverityBadgeClass = (severity) => {
    if (severity === "Critical") return "bg-[var(--flag-bg)] text-[var(--flag)]";
    if (severity === "High") return "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300";
    if (severity === "Medium") return "bg-[var(--caution-bg)] text-[var(--caution)]";
    return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
  };

  return (
    <div className="bg-[var(--panel)] border border-[var(--line)] shadow-lg overflow-hidden animate-fade-in my-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 border-b border-[var(--line)] bg-[#FBFAF6] dark:bg-[#12141A]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Score & Verdict */}
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8" className="text-[var(--line)]" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="8"
                  className="transition-all duration-1000"
                  stroke={score >= 81 ? "#B3402A" : score >= 61 ? "#E11D48" : score >= 41 ? "#9C6B12" : score >= 21 ? "#2563EB" : "#0E6B55"}
                  strokeDasharray={`${(score / 100) * 314.15} 314.15`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-bold text-[var(--ink)]">{score}</span>
                <span className="font-mono text-[10px] uppercase text-[var(--ink-dim)]">/ 100</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[11px] uppercase tracking-widest px-3 py-1 border border-2 font-bold ${getLevelBadgeClass(level, score)}`}>
                  {level}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-wider">
                  Case Verdict
                </span>
              </div>
              <h2 className="font-display font-semibold text-2xl mt-2 tracking-tight text-[var(--ink)]">
                {score >= 61 ? "High Risk Scam Detected" : score >= 41 ? "Suspicious Activity Flagged" : "Standard Risk Profile"}
              </h2>
              <p className="text-[13px] text-[var(--ink-dim)] mt-1 max-w-md leading-relaxed">
                Score computed from normalized multi-source signals and pattern evaluation.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={onReset}
              className="font-mono text-[11px] uppercase tracking-widest bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] px-4 py-2.5 hover:border-[var(--ink)] transition-colors cursor-pointer"
            >
              Analyze Another
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-4 py-2.5 hover:bg-[var(--verified)] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              View in Dashboard <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Explanation Paragraph */}
      {explanation && (
        <div className="px-6 sm:px-8 py-5 border-b border-[var(--line)] bg-[var(--paper)]/50 flex items-start gap-3">
          <Info className="w-5 h-5 text-[var(--ink-dim)] flex-shrink-0 mt-0.5" />
          <div className="text-[14px] leading-relaxed text-[var(--ink)] font-normal">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-dim)] block mb-1 font-semibold">
              ScamShield AI Analysis
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
            <h3 className="font-display font-semibold text-[17px] tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[var(--flag)]" />
              Detected Risk Factors ({factors.length})
            </h3>
            <span className="font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-wider">
              Categorized Signals
            </span>
          </div>

          {factors.length > 0 ? (
            <div className="space-y-3 pt-2">
              {factors.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-[var(--line)] bg-[var(--panel)] flex items-start justify-between gap-4 transition-all hover:border-[var(--ink-dim)]"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)] font-semibold border border-[var(--line)] px-2 py-0.5 bg-[var(--paper)]">
                        {factor.category || "General"}
                      </span>
                      <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold ${getSeverityBadgeClass(factor.severity)}`}>
                        {factor.severity || "Flag"}
                      </span>
                    </div>
                    <p className="text-[13.5px] font-medium text-[var(--ink)] pt-1 leading-snug">
                      {factor.reason || factor.description || factor}
                    </p>
                  </div>
                  <span className="font-mono text-[12px] font-bold text-[var(--flag)] bg-[var(--flag-bg)] px-2.5 py-1 border border-[var(--flag)]/20 flex-shrink-0">
                    +{factor.score || 15} pts
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 border border-dashed border-[var(--line)] text-center text-[var(--ink-dim)] text-[13.5px]">
              <CheckCircle2 className="w-8 h-8 text-[var(--verified)] mx-auto mb-2" />
              No severe red flags or high-risk keywords detected in this scan.
            </div>
          )}
        </div>

        {/* Right: Actionable Recommendations */}
        <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 bg-[#FAF9F5]">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-[17px] tracking-tight flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[var(--caution)]" />
              Recommended Actions
            </h3>
            <span className="font-mono text-[10px] text-[var(--ink-dim)] uppercase tracking-wider">
              Safety Advice
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 border border-[var(--line)] bg-[var(--panel)]">
                <span className="font-mono text-[11px] font-bold text-[var(--ink-dim)] bg-[var(--paper)] w-6 h-6 flex items-center justify-center border border-[var(--line)] flex-shrink-0 mt-0.5">
                  0{i + 1}
                </span>
                <p className="text-[13px] text-[var(--ink)] leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>

          {/* Report Button */}
          <div className="pt-4 border-t border-[var(--line)]">
            <button
              onClick={() => navigate("/report-scam", { state: { scan } })}
              className="w-full font-mono text-[11px] uppercase tracking-widest border border-[var(--flag)] text-[var(--flag)] hover:bg-[var(--flag-bg)] py-3 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flag className="w-3.5 h-3.5" /> Report This Opportunity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
