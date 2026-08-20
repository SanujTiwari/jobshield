import { useState, useEffect } from "react";
import {
  ShieldAlert,
  Users,
  FileCheck2,
  CheckCircle,
  AlertTriangle,
  RefreshCcw,
  Clock,
  Check,
  X,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ChatBot from "../components/ChatBot";
import { getAdminStats, getAdminReports, updateReportStatus } from "../services/adminService";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, reportsRes] = await Promise.all([
        getAdminStats(),
        getAdminReports(),
      ]);
      setStats(statsRes.stats);
      setReports(reportsRes.reports);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load admin controls.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      await updateReportStatus(reportId, newStatus);
      setReports(reports.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r)));
      toast.success(`Report status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update report status");
    }
  };

  const filteredReports = reports.filter(
    (r) => statusFilter === "all" || r.status.toLowerCase() === statusFilter.toLowerCase()
  );

  if (isLoading) return <LoadingSpinner message="Verifying Admin Clearance & Loading Dashboard..." />;

  return (
    <div className="js-root min-h-screen bg-[var(--paper)]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-2.5 py-1 font-bold">
              Admin Command Console
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight text-[var(--ink)] mt-2">
              ScamShield Operations
            </h1>
            <p className="text-[var(--ink-dim)] text-[14px] mt-1">
              Platform management, threat database feeds, and scam evidence review.
            </p>
          </div>

          <button
            onClick={loadAdminData}
            className="font-mono text-[11px] uppercase tracking-widest border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 hover:border-[var(--ink)] transition-colors flex items-center gap-1.5 cursor-pointer text-[var(--ink)]"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Refresh Console
          </button>
        </div>

        {/* Admin Metric Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 border border-[var(--line)] bg-[var(--panel)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)]">Total Registered Users</span>
                <Users className="w-4 h-4 text-[var(--ink-dim)]" />
              </div>
              <p className="font-mono text-3xl font-bold text-[var(--ink)]">{stats.totalUsers}</p>
            </div>

            <div className="p-5 border border-[var(--line)] bg-[var(--panel)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)]">Total Scam Scans</span>
                <FileCheck2 className="w-4 h-4 text-[var(--ink-dim)]" />
              </div>
              <p className="font-mono text-3xl font-bold text-[var(--ink)]">{stats.totalScans}</p>
            </div>

            <div className="p-5 border border-[var(--flag)] bg-[var(--flag-bg)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--flag)] font-bold">Critical Scans</span>
                <ShieldAlert className="w-4 h-4 text-[var(--flag)]" />
              </div>
              <p className="font-mono text-3xl font-bold text-[var(--flag)]">{stats.criticalScans}</p>
            </div>

            <div className="p-5 border border-[var(--caution)] bg-[var(--caution-bg)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--caution)] font-bold">Pending Reports</span>
                <Clock className="w-4 h-4 text-[var(--caution)]" />
              </div>
              <p className="font-mono text-3xl font-bold text-[var(--caution)]">{stats.pendingReports}</p>
            </div>
          </div>
        )}

        {/* User Scam Reports Review Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
            <h2 className="font-display font-semibold text-xl text-[var(--ink)]">
              Flagged Scam Reports ({filteredReports.length})
            </h2>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)]">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider bg-[var(--panel)] border border-[var(--line)] text-[var(--ink)] outline-none"
              >
                <option value="all">All Reports</option>
                <option value="pending">Pending</option>
                <option value="under review">Under Review</option>
                <option value="confirmed">Confirmed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {filteredReports.length > 0 ? (
            <div className="border border-[var(--line)] bg-[var(--panel)] divide-y divide-[var(--line)]">
              {filteredReports.map((report) => (
                <div key={report.id} className="p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest bg-[var(--paper)] border border-[var(--line)] px-2 py-0.5 font-semibold text-[var(--ink)]">
                        {report.scam_type}
                      </span>
                      <span className="font-mono text-[11px] text-[var(--ink-dim)]">
                        Reporter: {report.user_name || report.user_email || `User #${report.user_id}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 font-bold border ${
                        report.status === "Confirmed" ? "border-[var(--flag)] bg-[var(--flag-bg)] text-[var(--flag)]" :
                        report.status === "Under Review" ? "border-[var(--caution)] bg-[var(--caution-bg)] text-[var(--caution)]" :
                        report.status === "Rejected" ? "border-slate-300 bg-slate-100 text-slate-600" :
                        "border-blue-300 bg-blue-50 text-blue-600"
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[14px] font-semibold text-[var(--ink)]">
                      {report.company_name ? `Target: ${report.company_name}` : "Unspecified Company"}
                      {report.recruiter_info ? ` | Contact: ${report.recruiter_info}` : ""}
                    </p>
                    <p className="text-[13.5px] text-[var(--ink)] leading-relaxed">
                      {report.description}
                    </p>
                    {report.evidence && (
                      <div className="p-3 bg-[var(--paper)] border border-[var(--line)] font-mono text-[11px] text-[var(--ink-dim)] whitespace-pre-wrap mt-2">
                        Evidence Log: {report.evidence}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[var(--line)]">
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-dim)]">Set Status:</span>
                    <button
                      onClick={() => handleStatusUpdate(report.id, "Under Review")}
                      className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider border border-[var(--caution)] text-[var(--caution)] hover:bg-[var(--caution-bg)] cursor-pointer"
                    >
                      Under Review
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(report.id, "Confirmed")}
                      className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider border border-[var(--flag)] text-[var(--flag)] hover:bg-[var(--flag-bg)] cursor-pointer"
                    >
                      Confirm Scam
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(report.id, "Rejected")}
                      className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider border border-[var(--line)] text-[var(--ink-dim)] hover:bg-[var(--paper)] cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 border border-dashed border-[var(--line)] text-center text-[var(--ink-dim)] text-[13.5px]">
              No flagged scam reports found matching criteria.
            </div>
          )}
        </div>
      </main>

      <ChatBot />
    </div>
  );
}
