import { Eye, Trash2, FileDown, AlertTriangle, ShieldCheck, TrendingUp, Calendar } from "lucide-react";

function JobCard({ job, onViewDetails, onDelete, onExportPDF }) {
  const riskStyles = {
    'High Risk': {
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20',
      icon: <AlertTriangle className="w-4 h-4" />,
      scoreColor: 'text-rose-600 dark:text-rose-400',
      scoreSvg: 'text-rose-500',
    },
    'Medium Risk': {
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
      icon: <TrendingUp className="w-4 h-4" />,
      scoreColor: 'text-amber-600 dark:text-amber-400',
      scoreSvg: 'text-amber-500',
    },
    'Low Risk': {
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
      icon: <ShieldCheck className="w-4 h-4" />,
      scoreColor: 'text-emerald-600 dark:text-emerald-400',
      scoreSvg: 'text-emerald-500',
    },
  };

  const style = riskStyles[job.risk_level] || riskStyles['Low Risk'];
  const formattedDate = job.created_at
    ? new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'N/A';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 animate-fade-in group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white truncate text-base">
            {job.title || 'Untitled Job'}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {job.company_name || 'Unknown Company'}
          </p>
        </div>
        {/* Risk Score Circle */}
        <div className="relative w-12 h-12 flex-shrink-0 ml-3">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3"
              className="text-slate-200 dark:text-slate-700" />
            <circle cx="24" cy="24" r="20" fill="none" strokeWidth="3"
              className={style.scoreSvg}
              strokeDasharray={`${(job.risk_score / 100) * 125.6} 125.6`}
              strokeLinecap="round" />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${style.scoreColor}`}>
            {job.risk_score}
          </span>
        </div>
      </div>

      {/* Risk Badge & Date */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${style.badge}`}>
          {style.icon}
          {job.risk_level}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <Calendar className="w-3 h-3" />
          {formattedDate}
        </span>
      </div>

      {/* Description Preview */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        {job.description || 'No description available'}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onViewDetails}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all"
        >
          <Eye className="w-3.5 h-3.5" />
          Details
        </button>
        <button
          onClick={onExportPDF}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          title="Export PDF"
        >
          <FileDown className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-rose-500 dark:text-rose-400 text-sm font-medium hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default JobCard;
