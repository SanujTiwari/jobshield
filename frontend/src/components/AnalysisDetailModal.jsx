import { X, FileDown, AlertTriangle, ShieldCheck, TrendingUp, Calendar, Building2, Briefcase, Sparkles } from "lucide-react";
import { useEffect } from "react";

function AnalysisDetailModal({ job, isOpen, onClose, onExportPDF }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const riskStyles = {
    'High Risk': {
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      icon: <AlertTriangle className="w-5 h-5" />,
      scoreColor: 'text-rose-500',
      progressColor: '#f43f5e',
    },
    'Medium Risk': {
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      icon: <TrendingUp className="w-5 h-5" />,
      scoreColor: 'text-amber-500',
      progressColor: '#f59e0b',
    },
    'Low Risk': {
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      icon: <ShieldCheck className="w-5 h-5" />,
      scoreColor: 'text-emerald-500',
      progressColor: '#10b981',
    },
  };

  const style = riskStyles[job.risk_level] || riskStyles['Low Risk'];
  const reasons = typeof job.reasons === 'string' ? JSON.parse(job.reasons) : (job.reasons || []);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (job.risk_score / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Analysis Details</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onExportPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all"
            >
              <FileDown className="w-4 h-4" />
              Export PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Risk Score Circle + Job Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Score Circle */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="6"
                  className="text-slate-200 dark:text-slate-700" />
                <circle cx="60" cy="60" r="54" fill="none" strokeWidth="6"
                  stroke={style.progressColor}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold ${style.scoreColor}`}>{job.risk_score}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/ 100</span>
              </div>
            </div>

            {/* Job Details */}
            <div className="flex-1 text-center sm:text-left">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold ${style.badge} mb-3`}>
                {style.icon}
                {job.risk_level}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {job.title || 'Untitled Job'}
              </h3>
              <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 justify-center sm:justify-start">
                <Building2 className="w-4 h-4" />
                {job.company_name || 'Unknown Company'}
              </p>
              <p className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 mt-1 justify-center sm:justify-start">
                <Calendar className="w-3.5 h-3.5" />
                {job.created_at ? new Date(job.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
              </p>
            </div>
          </div>

          {/* AI Explanation */}
          {job.ai_explanation && (
            <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-xl p-4 border border-indigo-100 dark:border-indigo-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">AI Analysis</h4>
              </div>
              <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                {job.ai_explanation}
              </p>
            </div>
          )}

          {/* Risk Reasons */}
          {reasons.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Risk Factors ({reasons.length})
              </h4>
              <div className="space-y-2">
                {reasons.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Description */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-500" />
              Job Description
            </h4>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {job.description || 'No description provided'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisDetailModal;
