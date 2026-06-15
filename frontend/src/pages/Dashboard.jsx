import { useState, useEffect, useMemo } from "react";
import { ShieldAlert, Activity, CheckCircle, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import SearchFilterBar from "../components/SearchFilterBar";
import JobCard from "../components/JobCard";
import RiskChart from "../components/RiskChart";
import AnalysisDetailModal from "../components/AnalysisDetailModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ChatBot from "../components/ChatBot";

import { getHistory, getStats, deleteJob } from "../services/jobService";
import { generateAnalysisPDF } from "../utils/pdfExport";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Modal State
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      const [statsRes, historyRes] = await Promise.all([
        getStats(),
        getHistory()
      ]);
      setStats(statsRes.stats);
      setJobs(historyRes.jobs);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered and Searched Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch =
        (job.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (job.company_name?.toLowerCase() || '').includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'high' && job.risk_level === 'High Risk') ||
        (activeFilter === 'medium' && job.risk_level === 'Medium Risk') ||
        (activeFilter === 'low' && job.risk_level === 'Low Risk');

      return matchesSearch && matchesFilter;
    });
  }, [jobs, searchQuery, activeFilter]);

  // Actions
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedJob) return;
    setIsDeleting(true);
    try {
      await deleteJob(selectedJob.id);
      setJobs(jobs.filter(j => j.id !== selectedJob.id));
      
      // Update stats locally to avoid refetching
      if (stats) {
        const newStats = { ...stats, totalJobs: stats.totalJobs - 1 };
        if (selectedJob.risk_level === 'High Risk') newStats.highRisk--;
        else if (selectedJob.risk_level === 'Medium Risk') newStats.mediumRisk--;
        else newStats.lowRisk--;
        setStats(newStats);
      }
      
      toast.success("Analysis deleted successfully");
      setIsDeleteModalOpen(false);
      
      // If we deleted the job we were currently viewing in detail modal, close it
      if (isDetailModalOpen && selectedJob.id === selectedJob?.id) {
        setIsDetailModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to delete analysis");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportPDF = (job) => {
    try {
      generateAnalysisPDF(job);
      toast.success("Report exported successfully");
    } catch (error) {
      toast.error("Failed to export report");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 animate-fade-in">
              Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 animate-slide-up">
              Monitor and manage your job analysis history
            </p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-medium shadow-sm animate-fade-in"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <StatsCard
              title="Total Analyses"
              value={stats.totalJobs}
              icon={<Activity className="w-6 h-6" />}
              color="indigo"
            />
            <StatsCard
              title="High Risk Jobs"
              value={stats.highRisk}
              icon={<ShieldAlert className="w-6 h-6" />}
              color="rose"
            />
            <StatsCard
              title="Medium Risk Jobs"
              value={stats.mediumRisk}
              icon={<ShieldAlert className="w-6 h-6" />}
              color="amber"
            />
            <StatsCard
              title="Low Risk Jobs"
              value={stats.lowRisk}
              icon={<CheckCircle className="w-6 h-6" />}
              color="emerald"
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: List */}
          <div className="lg:col-span-2 space-y-6">
            <SearchFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              resultCount={filteredJobs.length}
            />

            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onViewDetails={() => handleViewDetails(job)}
                    onDelete={() => handleDeleteClick(job)}
                    onExportPDF={() => handleExportPDF(job)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <EmptyState
                  title={jobs.length === 0 ? "No analyses yet" : "No matches found"}
                  description={
                    jobs.length === 0
                      ? "Start by analyzing your first job posting to see it here."
                      : "We couldn't find any analyses matching your current search and filters."
                  }
                  isSearch={jobs.length > 0}
                  actionLabel={jobs.length === 0 ? "Analyze a Job" : "Clear Filters"}
                  onAction={() => {
                    if (jobs.length === 0) {
                      window.location.href = '/analyze';
                    } else {
                      setSearchQuery('');
                      setActiveFilter('all');
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Right Column: Chart */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RiskChart stats={stats} />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnalysisDetailModal
        job={selectedJob}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onExportPDF={() => handleExportPDF(selectedJob)}
      />

      <DeleteConfirmModal
        job={selectedJob}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />

      {/* Global Components */}
      <ChatBot />
    </div>
  );
}

export default Dashboard;