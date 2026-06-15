function StatsCard({ title, value, icon, color }) {
  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-500/10',
      icon: 'text-indigo-600 dark:text-indigo-400',
      value: 'text-indigo-600 dark:text-indigo-400',
    },
    rose: {
      bg: 'bg-rose-50 dark:bg-rose-500/10',
      icon: 'text-rose-600 dark:text-rose-400',
      value: 'text-rose-600 dark:text-rose-400',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      icon: 'text-amber-600 dark:text-amber-400',
      value: 'text-amber-600 dark:text-amber-400',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      icon: 'text-emerald-600 dark:text-emerald-400',
      value: 'text-emerald-600 dark:text-emerald-400',
    },
  };

  const colors = colorClasses[color] || colorClasses.indigo;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
          <div className={colors.icon}>
            {icon}
          </div>
        </div>
      </div>
      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
        {title}
      </h3>
      <p className={`text-3xl font-bold ${colors.value}`}>
        {value}
      </p>
    </div>
  );
}

export default StatsCard;