import { Search } from "lucide-react";

function SearchFilterBar({ searchQuery, onSearchChange, activeFilter, onFilterChange, resultCount }) {
  const filters = [
    { key: 'all', label: 'All Jobs' },
    { key: 'high', label: 'High Risk' },
    { key: 'medium', label: 'Medium Risk' },
    { key: 'low', label: 'Low Risk' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? filter.key === 'high'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : filter.key === 'medium'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : filter.key === 'low'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
        {resultCount} {resultCount === 1 ? 'result' : 'results'} found
      </p>
    </div>
  );
}

export default SearchFilterBar;
