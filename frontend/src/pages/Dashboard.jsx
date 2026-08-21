import { useState, useEffect, useMemo } from "react";
import {
  ShieldAlert,
  Activity,
  CheckCircle,
  RefreshCcw,
  Plus,
  Briefcase,
  MessageSquare,
  CreditCard,
  UserCheck,
  Globe,
  Trash2,
  Eye,
  FileText,
  AlertTriangle,
  Search,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ChatBot from "../components/ChatBot";
import RiskCard from "../components/RiskCard";

import { getScanHistory, deleteScan } from "../services/scanService";
import { getHistory, deleteJob } from "../services/jobService";
import { generateAnalysisPDF } from "../utils/pdfExport";

function Dashboard() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all");

  // Modal State
  const [selectedScan, setSelectedScan] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Try fetching V2 scans history, fallback to legacy jobs history
      let allScans = [];
      try {
        const scanRes = await getScanHistory();
        if (scanRes && scanRes.scans) {
          allScans = scanRes.scans;
        }
      } catch (e) {
        console.error("V2 scan history fetch error:", e);
      }

      // If no V2 scans, load legacy jobs
      if (allScans.length === 0) {
        try {
          const legacyRes = await getHistory();
          if (legacyRes && legacyRes.jobs) {
            allScans = legacyRes.jobs.map((job) => ({
              id: job.id,
              scan_type: "job",
              input_data: { title: job.title, companyName: job.company_name, description: job.description },
              risk_score: job.risk_score,
              risk_level: job.risk_level,
              ai_explanation: job.ai_explanation,
              created_at: job.created_at,
              risk_factors: Array.isArray(job.reasons) ? job.reasons.map(r => ({ category: "Content Risk", reason: r, score: 15, severity: "High" })) : [],
            }));
          }
        } catch (legacyErr) {
          console.error("Legacy history fetch error:", legacyErr);
        }
      }

      setScans(allScans);
    } catch (error) {
      toast.error("Failed to load dashboard history");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute Aggregated Statistics
  const stats = useMemo(() => {
    const total = scans.length;
    let critical = 0;
    let high = 0;
    let medium = 0;
    let safeLow = 0;

    const distribution = { job: 0, message: 0, payment: 0, recruiter: 0, url: 0 };

    scans.forEach((s) => {
      const level = s.risk_level || s.riskLevel;
      const score = s.risk_score || s.riskScore || 0;
      const type = s.scan_type || s.scanType || "job";

      if (distribution[type] !== undefined) distribution[type]++;

      if (score >= 81 || level === "Critical Risk") critical++;
      else if (score >= 61 || level === "High Risk") high++;
      else if (score >= 41 || level === "Medium Risk") medium++;
      else safeLow++;
    });

    return { total, critical, high, medium, safeLow, distribution };
  }, [scans]);

  // Filtered Scans List
  const filteredScans = useMemo(() => {
    return scans.filter((s) => {
      const type = s.scan_type || s.scanType || "job";
      const level = s.risk_level || s.riskLevel || "";
      const inputStr = JSON.stringify(s.input_data || {}).toLowerCase();

      const matchesSearch = !searchQuery || inputStr.includes(searchQuery.toLowerCase());
      const matchesType = activeType === "all" || type === activeType;
      const matchesLevel =
        activeLevel === "all" ||
        (activeLevel === "critical" && (level === "Critical Risk" || (s.risk_score || 0) >= 81)) ||
        (activeLevel === "high" && level === "High Risk") ||
        (activeLevel === "medium" && level === "Medium Risk") ||
        (activeLevel === "safe" && (level === "Low Risk" || level === "Safe"));

      return matchesSearch && matchesType && matchesLevel;
    });
  }, [scans, searchQuery, activeType, activeLevel]);

  const handleDelete = async (scanId) => {
    if (!window.confirm("Are you sure you want to delete this scan file?")) return;
    try {
      await deleteScan(scanId);
      setScans(scans.filter((s) => s.id !== scanId));
      if (selectedScan && selectedScan.id === scanId) setSelectedScan(null);
      toast.success("Scan record deleted");
    } catch (e) {
      try {
        await deleteJob(scanId);
        setScans(scans.filter((s) => s.id !== scanId));
        toast.success("Scan record deleted");
      } catch (err) {
        toast.error("Failed to delete scan record");
      }
    }
  };

  const getScanTypeIcon = (type) => {
    if (type === "message") return <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    if (type === "payment") return <CreditCard className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    if (type === "recruiter") return <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    if (type === "url") return <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    return <Briefcase className="w-4 h-4 text-[var(--ink)]" />;
  };

  const getTitle = (scan) => {
    const data = scan.input_data || {};
    if (scan.scan_type === "job") return `${data.title || "Job Scan"} — ${data.companyName || ""}`;
    if (scan.scan_type === "message") return `Message via ${data.platform || "Direct"}`;
    if (scan.scan_type === "payment") return `Payment Request (${data.amount || "N/A"})`;
    if (scan.scan_type === "recruiter") return `Recruiter: ${data.name || data.email || "Unknown"}`;
    if (scan.scan_type === "url") return `URL: ${data.url || "Link"}`;
    return data.title || "Scam Analysis Case File";
  };

  if (isLoading) return <LoadingSpinner message="Loading ScamShield Dashboard..." />;

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)] font-bold">
              ScamShield Intelligence Unit
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--ink)] mt-1">
              Case File Dashboard
            </h1>
            <p className="text-[var(--ink-dim)] text-[14px] mt-1 font-normal">
              Monitor multi-type scam detection cases, risk distributions, and intake history.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="font-mono text-[11px] uppercase tracking-widest border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 rounded-xl hover:border-[var(--ink-dim)] transition-all flex items-center gap-1.5 cursor-pointer text-[var(--ink)] font-medium shadow-xs"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button
              onClick={() => navigate("/scanner")}
              className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-2.5 rounded-xl hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer font-semibold shadow-xs"
            >
              <Plus className="w-4 h-4" /> New Case Scan
            </button>
          </div>
        </div>

        {/* Stats Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)] font-bold">Total Scans</span>
              <Activity className="w-4 h-4 text-[var(--ink-dim)]" />
            </div>
            <p className="font-mono text-3xl font-extrabold text-[var(--ink)]">{stats.total}</p>
            <p className="text-[12px] text-[var(--ink-dim)]">Processed across all modules</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="p-5 rounded-2xl border border-[var(--flag)]/30 bg-[var(--flag-bg)] space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--flag)] font-extrabold">Critical Risk</span>
              <ShieldAlert className="w-4 h-4 text-[var(--flag)]" />
            </div>
            <p className="font-mono text-3xl font-extrabold text-[var(--flag)]">{stats.critical}</p>
            <p className="text-[12px] text-[var(--flag)] font-medium">Immediate caution required</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-5 rounded-2xl border border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20 space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-rose-600 dark:text-rose-400 font-extrabold">High Risk</span>
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
            <p className="font-mono text-3xl font-extrabold text-rose-600 dark:text-rose-400">{stats.high}</p>
            <p className="text-[12px] text-rose-600 dark:text-rose-400 font-medium">High probability scam flags</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="p-5 rounded-2xl border border-[var(--verified)]/30 bg-[var(--verified-bg)] space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--verified)] font-extrabold">Verified / Safe</span>
              <CheckCircle className="w-4 h-4 text-[var(--verified)]" />
            </div>
            <p className="font-mono text-3xl font-extrabold text-[var(--verified)]">{stats.safeLow}</p>
            <p className="text-[12px] text-[var(--verified)] font-medium">Minimal threat profiles</p>
          </motion.div>
        </div>

        {/* Scam Type Distribution Breakdown */}
        <div className="p-6 rounded-2xl border border-[var(--line)] bg-[var(--panel)] space-y-4 shadow-xs">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)] block font-bold">
            Scam Type Distribution Breakdown
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { type: "job", label: "Job Scans", count: stats.distribution.job, icon: Briefcase },
              { type: "message", label: "Messages", count: stats.distribution.message, icon: MessageSquare },
              { type: "payment", label: "Payments", count: stats.distribution.payment, icon: CreditCard },
              { type: "recruiter", label: "Recruiters", count: stats.distribution.recruiter, icon: UserCheck },
              { type: "url", label: "URL Links", count: stats.distribution.url, icon: Globe },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.type} className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[var(--ink-dim)]" />
                    <span className="font-display text-[13px] font-medium text-[var(--ink)]">{item.label}</span>
                  </div>
                  <span className="font-mono text-[13px] font-bold text-[var(--ink)]">{item.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--panel)] p-4 rounded-2xl border border-[var(--line)] shadow-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--ink-dim)] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case files by keyword, title, sender, or entity..."
              className="w-full pl-10 pr-4 py-2 text-[13px] rounded-xl bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="px-3.5 py-2 rounded-xl font-mono text-[11px] uppercase tracking-wider bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] outline-none cursor-pointer"
            >
              <option value="all">All Scanner Types</option>
              <option value="job">Job Scans</option>
              <option value="message">Messages</option>
              <option value="payment">Payments</option>
              <option value="recruiter">Recruiters</option>
              <option value="url">URLs</option>
            </select>

            <select
              value={activeLevel}
              onChange={(e) => setActiveLevel(e.target.value)}
              className="px-3.5 py-2 rounded-xl font-mono text-[11px] uppercase tracking-wider bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] outline-none cursor-pointer"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical Risk (81-100)</option>
              <option value="high">High Risk (61-80)</option>
              <option value="medium">Medium Risk (41-60)</option>
              <option value="safe">Safe / Low Risk (0-40)</option>
            </select>
          </div>
        </div>

        {/* Case Files Feed */}
        {filteredScans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScans.map((scan) => {
              const score = scan.risk_score || scan.riskScore || 0;
              const level = scan.risk_level || scan.riskLevel || "Low Risk";
              const type = scan.scan_type || scan.scanType || "job";

              return (
                <motion.div
                  key={scan.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] flex flex-col justify-between space-y-4 hover:border-[var(--ink-dim)] transition-all shadow-2xs"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getScanTypeIcon(type)}
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)] border border-[var(--line)] px-2 py-0.5 rounded-md bg-[var(--paper)] font-semibold">
                          {type}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--ink-dim)]">
                        {new Date(scan.created_at || Date.now()).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-[16px] text-[var(--ink)] line-clamp-1">
                      {getTitle(scan)}
                    </h3>

                    {scan.ai_explanation && (
                      <p className="text-[13px] text-[var(--ink-dim)] line-clamp-2 leading-relaxed">
                        {scan.ai_explanation}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-[var(--ink)]">Score: {score}/100</span>
                      <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        score >= 81 ? "border-[var(--flag)] bg-[var(--flag-bg)] text-[var(--flag)] font-bold" :
                        score >= 61 ? "border-rose-400 bg-rose-50 text-rose-600 font-bold" :
                        score >= 41 ? "border-[var(--caution)] bg-[var(--caution-bg)] text-[var(--caution)] font-semibold" :
                        "border-[var(--verified)] bg-[var(--verified-bg)] text-[var(--verified)] font-semibold"
                      }`}>
                        {level}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedScan(scan)}
                        className="p-2 rounded-lg border border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink)] transition-colors cursor-pointer"
                        title="View Full Case File"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => generateAnalysisPDF(scan)}
                        className="p-2 rounded-lg border border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink)] transition-colors cursor-pointer"
                        title="Export PDF Report"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(scan.id)}
                        className="p-2 rounded-lg border border-[var(--line)] hover:border-[var(--flag)] text-[var(--flag)] transition-colors cursor-pointer"
                        title="Delete Case File"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--panel)] text-center space-y-3">
            <ShieldAlert className="w-10 h-10 text-[var(--ink-dim)] mx-auto" />
            <h3 className="font-display font-semibold text-lg text-[var(--ink)]">No Case Files Match Filter</h3>
            <p className="text-[13.5px] text-[var(--ink-dim)] max-w-sm mx-auto">
              No scan records match your active search terms or risk filters. Try clearing your filters or start a new scan.
            </p>
            <button
              onClick={() => navigate("/scanner")}
              className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-2.5 rounded-xl hover:opacity-95 transition-all inline-flex items-center gap-1.5 cursor-pointer mt-2 font-semibold"
            >
              Start New Scan
            </button>
          </div>
        )}
      </main>

      {/* Selected Scan Modal */}
      <AnimatePresence>
        {selectedScan && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl w-full my-8"
            >
              <RiskCard
                scan={selectedScan}
                onReset={() => setSelectedScan(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ChatBot />
    </div>
  );
}

export default Dashboard;