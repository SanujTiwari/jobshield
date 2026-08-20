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
  Filter,
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
    if (type === "message") return <MessageSquare className="w-4 h-4 text-blue-600" />;
    if (type === "payment") return <CreditCard className="w-4 h-4 text-amber-600" />;
    if (type === "recruiter") return <UserCheck className="w-4 h-4 text-purple-600" />;
    if (type === "url") return <Globe className="w-4 h-4 text-emerald-600" />;
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

  if (isLoading) return <LoadingSpinner message="Loading Scan History..." />;

  return (
    <div className="js-root min-h-screen bg-[var(--paper)]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)]">
              Archived Case Files
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight text-[var(--ink)] mt-1">
              Scan History
            </h1>
            <p className="text-[var(--ink-dim)] text-[14px] mt-1">
              Inspect past scam verdicts, risk factors, and exported reports.
            </p>
          </div>

          <button
            onClick={() => navigate("/scanner")}
            className="font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] px-5 py-2.5 hover:bg-[var(--verified)] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            New Scan <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--panel)] p-4 border border-[var(--line)]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--ink-dim)] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history by keyword or sender..."
              className="w-full pl-10 pr-4 py-2 text-[13px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 font-mono text-[11px] uppercase tracking-wider bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] outline-none"
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
              className="px-3 py-2 font-mono text-[11px] uppercase tracking-wider bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)] outline-none"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical Risk</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="safe">Safe / Low Risk</option>
            </select>
          </div>
        </div>

        {/* Scans Table / List */}
        {filteredScans.length > 0 ? (
          <div className="border border-[var(--line)] bg-[var(--panel)] divide-y divide-[var(--line)]">
            {filteredScans.map((scan) => {
              const score = scan.risk_score || scan.riskScore || 0;
              const level = scan.risk_level || scan.riskLevel || "Low Risk";
              const type = scan.scan_type || scan.scanType || "job";

              return (
                <div key={scan.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[var(--paper)]/50 transition-colors">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2.5 border border-[var(--line)] bg-[var(--paper)] flex-shrink-0 mt-0.5">
                      {getScanTypeIcon(type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)] border border-[var(--line)] px-2 py-0.5 bg-[var(--paper)]">
                          {type}
                        </span>
                        <span className="font-mono text-[11px] text-[var(--ink-dim)]">
                          {new Date(scan.created_at || Date.now()).toLocaleString()}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-[16px] text-[var(--ink)]">
                        {getTitle(scan)}
                      </h3>
                      {scan.ai_explanation && (
                        <p className="text-[13px] text-[var(--ink-dim)] line-clamp-1 max-w-xl">
                          {scan.ai_explanation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-[var(--line)] pt-3 sm:pt-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-[var(--ink)]">{score}/100</span>
                      <span className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 font-bold border ${
                        score >= 81 ? "border-[var(--flag)] bg-[var(--flag-bg)] text-[var(--flag)]" :
                        score >= 61 ? "border-rose-500 bg-rose-50 text-rose-600" :
                        score >= 41 ? "border-[var(--caution)] bg-[var(--caution-bg)] text-[var(--caution)]" :
                        "border-[var(--verified)] bg-[var(--verified-bg)] text-[var(--verified)]"
                      }`}>
                        {level}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedScan(scan)}
                        className="p-2 border border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink)] transition-colors cursor-pointer"
                        title="View Case File Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => generateAnalysisPDF(scan)}
                        className="p-2 border border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink)] transition-colors cursor-pointer"
                        title="Export PDF Report"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(scan.id)}
                        className="p-2 border border-[var(--line)] hover:border-[var(--flag)] text-[var(--flag)] transition-colors cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 border border-dashed border-[var(--line)] bg-[var(--panel)] text-center space-y-3">
            <ShieldAlert className="w-10 h-10 text-[var(--ink-dim)] mx-auto" />
            <h3 className="font-display font-semibold text-lg text-[var(--ink)]">No History Records Found</h3>
            <p className="text-[13.5px] text-[var(--ink-dim)] max-w-sm mx-auto">
              No historical scan entries match your filters.
            </p>
          </div>
        )}
      </main>

      {/* Selected Scan Modal */}
      {selectedScan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
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
