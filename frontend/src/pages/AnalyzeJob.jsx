import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Building2, FileText, Search, ShieldAlert, CheckCircle, AlertTriangle } from "lucide-react";

import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";
import LoadingSpinner from "../components/LoadingSpinner";
import { analyzeJob } from "../services/jobService";

function AnalyzeJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.companyName || !formData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await analyzeJob(formData);
      setResult(response.analysis);
      toast.success("Analysis complete!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to analyze job");
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (level) => {
    if (level === "High Risk") return "text-rose-500";
    if (level === "Medium Risk") return "text-amber-500";
    return "text-emerald-500";
  };

  const getRiskIcon = (level) => {
    if (level === "High Risk") return <ShieldAlert className="w-8 h-8 text-rose-500" />;
    if (level === "Medium Risk") return <AlertTriangle className="w-8 h-8 text-amber-500" />;
    return <CheckCircle className="w-8 h-8 text-emerald-500" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {isLoading && <LoadingSpinner message="JobShield AI is scanning your job description..." />}
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Analyze Job Posting
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Paste the details of a job posting below. Our AI will analyze the description for common scam indicators and provide a risk assessment.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Job Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Company Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Tech Corp Inc."
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                Job Description
                <span className="text-xs font-normal text-slate-500">Copy and paste the full text</span>
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 pointer-events-none">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <textarea
                  required
                  rows="8"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-y min-h-[200px]"
                  placeholder="Paste the full job description here. The more text you provide, the better our analysis will be..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing Details...
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5" />
                  Analyze Posting
                </>
              )}
            </button>
          </form>

          {/* Results Section */}
          {result && (
            <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8 animate-slide-up">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Analysis Results</h2>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Score Circular Indicator */}
                <div className="relative w-40 h-40 flex-shrink-0">
                  <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-700" />
                    <circle cx="60" cy="60" r="54" fill="none" strokeWidth="8"
                      className={getRiskColor(result.risk_level)}
                      strokeDasharray={`${(result.risk_score / 100) * 339.29} 339.29`}
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${getRiskColor(result.risk_level)}`}>{result.risk_score}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">/ 100</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    {getRiskIcon(result.risk_level)}
                    <div>
                      <h3 className={`text-2xl font-bold ${getRiskColor(result.risk_level)}`}>
                        {result.risk_level}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Risk Assessment</p>
                    </div>
                  </div>

                  {result.ai_explanation && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        {result.ai_explanation}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="flex-1 py-2.5 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-center"
                    >
                      View in Dashboard
                    </button>
                    <button
                      onClick={() => { setResult(null); setFormData({ title: "", companyName: "", description: "" }); }}
                      className="flex-1 py-2.5 px-4 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all text-center"
                    >
                      Analyze Another
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <ChatBot />
    </div>
  );
}

export default AnalyzeJob;
