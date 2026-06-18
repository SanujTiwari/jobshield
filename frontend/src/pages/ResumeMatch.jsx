import { useState, useEffect } from "react";
import { 
  FileText, 
  Upload, 
  Sparkles, 
  Trash2, 
  Plus, 
  Briefcase, 
  GraduationCap, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  FileCheck,
  Calendar,
  Undo2
} from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { getHistory } from "../services/jobService";
import { 
  matchResume, 
  getResumeHistory, 
  getResumeDetail, 
  deleteResumeMatch 
} from "../services/resumeService";

export default function ResumeMatch() {
  const [activeTab, setActiveTab] = useState("new"); // "new" or "history"
  const [resumeSource, setResumeSource] = useState("upload"); // "upload" or "paste"
  const [jobSource, setJobSource] = useState("history"); // "history" or "paste"
  
  // History lists
  const [scannedJobs, setScannedJobs] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);
  
  // Form State
  const [selectedJobId, setSelectedJobId] = useState("");
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    description: "",
    resumeText: "",
  });
  
  // File upload state
  const [file, setFile] = useState(null);
  const [fileBase64, setFileBase64] = useState("");
  const [fileMimeType, setFileMimeType] = useState("");
  
  // Loading & Result states
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [result, setResult] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [jobsRes, historyRes] = await Promise.all([
          getHistory(),
          getResumeHistory()
        ]);
        setScannedJobs(jobsRes.jobs || []);
        setMatchHistory(historyRes.history || []);
      } catch (error) {
        console.error("Failed to load initial data", error);
        toast.error("Failed to load history lists");
      } finally {
        setIsHistoryLoading(false);
      }
    };
    loadInitialData();
  }, []);

  // Update form fields when scanned job changes
  useEffect(() => {
    if (selectedJobId && jobSource === "history") {
      const selectedJob = scannedJobs.find(j => j.id.toString() === selectedJobId.toString());
      if (selectedJob) {
        setFormData(prev => ({
          ...prev,
          jobTitle: selectedJob.title || "",
          companyName: selectedJob.company_name || "",
          description: selectedJob.description || "",
        }));
      }
    } else if (jobSource === "paste") {
      setFormData(prev => ({
        ...prev,
        jobTitle: "",
        companyName: "",
        description: "",
      }));
      setSelectedJobId("");
    }
  }, [selectedJobId, jobSource, scannedJobs]);

  // Handle file changes
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 4 * 1024 * 1024) {
      toast.error("File size must be less than 4MB");
      return;
    }

    const validTypes = ["application/pdf", "text/plain"];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Only PDF and TXT files are supported");
      return;
    }

    setFile(selectedFile);
    setFileMimeType(selectedFile.type);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setFileBase64(base64);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Submit matching analysis
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.jobTitle || !formData.companyName || !formData.description) {
      toast.error("Please fill out all job details.");
      return;
    }

    if (resumeSource === "paste" && !formData.resumeText.trim()) {
      toast.error("Please paste your resume text.");
      return;
    }

    if (resumeSource === "upload" && !fileBase64) {
      toast.error("Please upload your resume file.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    const payload = {
      jobTitle: formData.jobTitle,
      companyName: formData.companyName,
      description: formData.description,
      ...(resumeSource === "paste"
        ? { resumeText: formData.resumeText }
        : { resumeFile: fileBase64, mimeType: fileMimeType }),
    };

    try {
      const response = await matchResume(payload);
      setResult(response.match);
      toast.success("Resume comparison complete!");
      
      // Refresh history list
      const hist = await getResumeHistory();
      setMatchHistory(hist.history || []);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to analyze resume match");
    } finally {
      setIsLoading(false);
    }
  };

  // Load a historical match
  const handleLoadMatch = async (id) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await getResumeDetail(id);
      setResult(response.match);
      setActiveTab("new");
    } catch (error) {
      toast.error("Failed to load resume match details");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a match from history
  const handleDeleteMatch = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this comparison report?")) return;

    try {
      await deleteResumeMatch(id);
      setMatchHistory(prev => prev.filter(m => m.id !== id));
      toast.success("Match report deleted");
      if (result && result.id === id) {
        setResult(null);
      }
    } catch (error) {
      toast.error("Failed to delete report");
    }
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 50) return "text-amber-500";
    return "text-rose-500";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 animate-fade-in">
              Resume Matching Engine
            </h1>
            <p className="text-slate-500 dark:text-slate-400 animate-slide-up">
              Tailor your resume, identify gaps, and structure learning paths for target jobs
            </p>
          </div>

          <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 select-none">
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "new"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Analyze Resume
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "history"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Match History ({matchHistory.length})
            </button>
          </div>
        </div>

        {/* Tab 1: New Comparison */}
        {activeTab === "new" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form */}
            <div className={`space-y-6 ${result ? "lg:col-span-5" : "lg:col-span-12 max-w-4xl mx-auto w-full"}`}>
              {result && (
                <button
                  onClick={() => setResult(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white shadow-sm transition-all"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  New Analysis
                </button>
              )}

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Job Source Selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      Target Job Details
                      <div className="flex gap-2 text-xs font-normal">
                        <button
                          type="button"
                          onClick={() => setJobSource("history")}
                          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            jobSource === "history"
                              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold"
                              : "text-slate-400"
                          }`}
                        >
                          Scanned History
                        </button>
                        <button
                          type="button"
                          onClick={() => setJobSource("paste")}
                          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            jobSource === "paste"
                              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold"
                              : "text-slate-400"
                          }`}
                        >
                          Paste New
                        </button>
                      </div>
                    </label>

                    {jobSource === "history" ? (
                      <select
                        value={selectedJobId}
                        onChange={(e) => setSelectedJobId(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                      >
                        <option value="">-- Choose a Scanned Job --</option>
                        {scannedJobs.map((j) => (
                          <option key={j.id} value={j.id}>
                            {j.title} at {j.company_name} ({j.risk_level})
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>

                  {/* Job Title and Company inputs (Disabled if source is history) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Job Title</label>
                      <input
                        type="text"
                        required
                        disabled={jobSource === "history"}
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 disabled:opacity-75 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="e.g. Senior Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company</label>
                      <input
                        type="text"
                        required
                        disabled={jobSource === "history"}
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 disabled:opacity-75 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="e.g. Acme Corp"
                      />
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Job Description</label>
                    <textarea
                      required
                      disabled={jobSource === "history"}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={result ? 4 : 6}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 disabled:opacity-75 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm resize-y"
                      placeholder="Paste the full job description details..."
                    />
                  </div>

                  {/* Resume Upload Selector */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      Your Resume
                      <div className="flex gap-2 text-xs font-normal">
                        <button
                          type="button"
                          onClick={() => setResumeSource("upload")}
                          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            resumeSource === "upload"
                              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold"
                              : "text-slate-400"
                          }`}
                        >
                          Upload PDF
                        </button>
                        <button
                          type="button"
                          onClick={() => setResumeSource("paste")}
                          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            resumeSource === "paste"
                              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold"
                              : "text-slate-400"
                          }`}
                        >
                          Paste Text
                        </button>
                      </div>
                    </label>

                    {resumeSource === "upload" ? (
                      <div className="relative group border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all bg-slate-50/50 dark:bg-slate-950/20">
                        <input
                          type="file"
                          accept=".pdf,.txt"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {file ? file.name : "Select Resume File"}
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                          PDF or TXT (Max 4MB)
                        </p>
                      </div>
                    ) : (
                      <textarea
                        required
                        value={formData.resumeText}
                        onChange={(e) => setFormData({ ...formData, resumeText: e.target.value })}
                        rows={result ? 6 : 8}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm resize-y"
                        placeholder="Paste your plain text resume here..."
                      />
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing Fit...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        Compare Resume
                      </>
                    )}
                  </button>

                </form>
              </div>
            </div>

            {/* Right Column: Analysis Output Display */}
            {result && (
              <div className="lg:col-span-7 space-y-6 animate-scale-in">
                
                {/* Score gauge & Summary */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center gap-6">
                  
                  {/* Gauge */}
                  <div className="relative w-36 h-36 flex-shrink-0">
                    <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                      <circle cx="60" cy="60" r="52" fill="none" strokeWidth="8"
                        className={getScoreColor(result.compatibility_score)}
                        strokeDasharray={`${(result.compatibility_score / 100) * 326.7} 326.7`}
                        strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-4xl font-bold ${getScoreColor(result.compatibility_score)}`}>
                        {result.compatibility_score}%
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Match</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-indigo-500" />
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {result.job_title} Match Summary
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/40 p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
                      {result.match_summary}
                    </p>
                  </div>
                </div>

                {/* Gaps: Missing Skills */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">Missing Target Skills</h3>
                  </div>
                  {result.missing_skills?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.missing_skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-100 dark:border-rose-500/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-emerald-600 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Incredible! Your resume covers all core technical skills requested in this posting.
                    </p>
                  )}
                </div>

                {/* Recommendations checklist */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <FileCheck className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">Resume Tailoring Checklist</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {result.improvement_tips?.map((tip, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 items-start">
                        <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                          {i + 1}
                        </div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learning Paths */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <GraduationCap className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">Personalized Skill Upgrades</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.learning_path?.map((path, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 space-y-2">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{path.skill}</h4>
                        <div className="space-y-1">
                          {path.resources?.map((res, idx) => (
                            <p key={idx} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <ChevronRight className="w-3 h-3 text-indigo-500 flex-shrink-0" />
                              {res}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Tab 2: Match History */}
        {activeTab === "history" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            {isHistoryLoading ? (
              <div className="py-20 flex justify-center">
                <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
              </div>
            ) : matchHistory.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {matchHistory.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => handleLoadMatch(m.id)}
                    className="p-5 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <FileCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {m.job_title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-medium">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            {m.company_name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(m.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-lg font-black ${getScoreColor(m.compatibility_score)}`}>
                          {m.compatibility_score}%
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Match Score</p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteMatch(m.id, e)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                        title="Delete Report"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center max-w-sm mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">No matches analyzed yet</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Compare your resume with your target job description to verify compatibility scores.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("new")}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Analyze a Resume
                </button>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
