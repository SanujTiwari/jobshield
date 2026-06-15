import { Search, ShieldOff } from "lucide-react";

function EmptyState({ title, description, actionLabel, onAction, isSearch }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
        {isSearch ? (
          <Search className="w-10 h-10 text-slate-400 dark:text-slate-500" />
        ) : (
          <ShieldOff className="w-10 h-10 text-slate-400 dark:text-slate-500" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
