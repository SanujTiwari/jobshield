import { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Search,
  Trash2,
  Eye,
  Briefcase,
  MessageSquare,
  CreditCard,
  UserCheck,
  Globe,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import RiskCard from "../components/RiskCard";
import ChatBot from "../components/ChatBot";

import { getScanHistory, deleteScan } from "../services/scanService";
import { getHistory, deleteJob } from "../services/jobService";
import { generateAnalysisPDF } from "../utils/pdfExport";

export default function History() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScan, setSelectedScan] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      let data = [];
      try {
        const res = await getScanHistory();
        if (res && res.scans) data = res.scans;
      } catch (e) {
        console.error("V2 history fetch error:", e);
      }

      if (data.length === 0) {
        try {
          const legacyRes = await getHistory();
          if (legacyRes && legacyRes.jobs) {
            data = legacyRes.jobs.map((j) => ({
              id: j.id,
              scan_type: "job",
              input_data: { title: j.title, companyName: j.company_name, description: j.description },
              risk_score: j.risk_score,
              risk_level: j.risk_level,
              ai_explanation: j.ai_explanation,
              created_at: j.created_at,
              risk_factors: Array.isArray(j.reasons) ? j.reasons.map(r => ({ category: "Content Risk", reason: r, score: 15, severity: "High" })) : [],
            }));
          }
        } catch (err) {
          console.error("Legacy history fetch error:", err);
        }
      }

      setScans(data);
    } catch (error) {
      toast.error("Failed to load scan history");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const filteredScans = useMemo(() => {
    return scans.filter((s) => {
      const type = s.scan_type || s.scanType || "job";
      const level = s.risk_level || s.riskLevel || "";
      const text = JSON.stringify(s.input_data || {}).toLowerCase();

      const matchesSearch = !searchQuery || text.includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || type === typeFilter;
      const matchesLevel =
        levelFilter === "all" ||
        (levelFilter === "critical" && (level === "Critical Risk" || (s.risk_score || 0) >= 81)) ||
        (levelFilter === "high" && level === "High Risk") ||
        (levelFilter === "medium" && level === "Medium Risk") ||
        (levelFilter === "safe" && (level === "Low Risk" || level === "Safe"));

      return matchesSearch && matchesType && matchesLevel;
    });
  }, [scans, searchQuery, typeFilter, levelFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scan entry?")) return;
    try {
      await deleteScan(id);
      setScans(scans.filter((s) => s.id !== id));
      toast.success("Scan deleted");
    } catch (e) {
      try {
        await deleteJob(id);
        setScans(scans.filter((s) => s.id !== id));
        toast.success("Scan deleted");
      } catch (err) {
        toast.error("Failed to delete scan");
      }
    }
  };

  const getScanTypeIcon = (type) => {
    if (type === "message") return <MessageSquare className="w-4 h-4 text-blue-500" />;
    if (type === "payment") return <CreditCard className="w-4 h-4 text-amber-500" />;
    if (type === "recruiter") return <UserCheck className="w-4 h-4 text-indigo-500" />;
    if (type === "url") return <Globe className="w-4 h-4 text-emerald-500" />;
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

  if (isLoading) return <LoadingSpinner message="Loading History..." />;

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-sans transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              <span className="font-sans text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                Archives
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl tracking-tight text-[var(--ink)] mt-2">
              Scan History
            </h1>
            <p className="text-[var(--ink-dim)] text-xs mt-1 font-semibold">
              Inspect historical risk assessments, explainable results, and reports.
            </p>
          </div>

          <button
            onClick={() => navigate("/scanner")}
            className="font-sans text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            New Scan <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--panel)] p-4 rounded-2xl border border-[var(--line)] shadow-sm">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--ink-dim)] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history by keyword or sender..."
              className="w-full pl-10 pr-4 py-2.5 text-[13px] rounded-xl bg-[var(--panel-secondary)] border border-[var(--line)] focus:border-indigo-500 text-[var(--ink)] outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl font-sans text-xs font-semibold bg-[var(--panel-secondary)] border border-[var(--line)] text-[var(--ink)] outline-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="job">Jobs</option>
              <option value="message">Messages</option>
              <option value="payment">Payments</option>
              <option value="recruiter">Recruiters</option>
              <option value="url">URLs</option>
            </select>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl font-sans text-xs font-semibold bg-[var(--panel-secondary)] border border-[var(--line)] text-[var(--ink)] outline-none cursor-pointer"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical Risk</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="safe">Safe / Low Risk</option>
            </select>
          </div>
        </div>

        {/* Scans list */}
        {filteredScans.length > 0 ? (
          <div className="border border-[var(--line)] bg-[var(--panel)] rounded-2xl divide-y divide-[var(--line)] overflow-hidden shadow-sm">
            {filteredScans.map((scan) => {
              const score = scan.risk_score || scan.riskScore || 0;
              const level = scan.risk_level || scan.riskLevel || "Low Risk";
              const type = scan.scan_type || scan.scanType || "job";

              return (
                <div key={scan.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[var(--panel-secondary)]/50 transition-colors">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--panel-secondary)] flex-shrink-0 mt-0.5">
                      {getScanTypeIcon(type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[var(--ink-dim)] border border-[var(--line)] px-2 py-0.5 rounded-md bg-[var(--panel-secondary)]">
                          {type}
                        </span>
                        <span className="font-sans text-[10px] text-[var(--ink-dim)]">
                          {new Date(scan.created_at || Date.now()).toLocaleString()}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-[15px] text-[var(--ink)]">
                        {getTitle(scan)}
                      </h3>
                      {scan.ai_explanation && (
                        <p className="text-xs text-[var(--ink-dim)] line-clamp-1 max-w-xl leading-relaxed">
                          {scan.ai_explanation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-[var(--line)] pt-3 sm:pt-0">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xs font-bold text-[var(--ink)]">{score}/100</span>
                      <span className={`font-sans text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        score >= 81 ? "badge-flag" :
                        score >= 61 ? "badge-flag" :
                        score >= 41 ? "badge-caution" :
                        "badge-verified"
                      }`}>
                        {level}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedScan(scan)}
                        className="p-2 rounded-lg border border-[var(--line)] hover:bg-[var(--panel-secondary)] text-[var(--ink)] transition-colors cursor-pointer"
                        title="View Case File Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => generateAnalysisPDF(scan)}
                        className="p-2 rounded-lg border border-[var(--line)] hover:bg-[var(--panel-secondary)] text-[var(--ink)] transition-colors cursor-pointer"
                        title="Export PDF Report"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(scan.id)}
                        className="p-2 rounded-lg border border-[var(--line)] hover:bg-red-500/10 text-red-500 transition-colors cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--panel)] text-center space-y-3 shadow-xs">
            <ShieldAlert className="w-10 h-10 text-[var(--ink-dim)] mx-auto" />
            <h3 className="font-display font-semibold text-lg text-[var(--ink)]">No historical records found</h3>
            <p className="text-xs text-[var(--ink-dim)] max-w-sm mx-auto">
              No historical scan entries match your filters.
            </p>
          </div>
        )}
      </main>

      {/* Selected Scan Modal */}
      {selectedScan && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl w-full my-8">
            <RiskCard
              scan={selectedScan}
              onReset={() => setSelectedScan(null)}
            />
          </div>
        </div>
      )}

      <ChatBot />
    </div>
  );
}
