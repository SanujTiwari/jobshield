import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  ArrowRight, 
  Search, 
  Lock, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight,
  Settings,
  Bot,
  FileCheck,
  Zap
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import SettingsModal from "../components/SettingsModal";

function Landing() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mockJobTitle, setMockJobTitle] = useState("");
  const { setIsSettingsOpen } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleHeroScan = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/analyze");
    } else {
      // Pass the typed text to the auth page or just navigate
      navigate("/auth", { state: { initialScan: mockJobTitle } });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      
      {/* Decorative Blob 1 */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      {/* Decorative Blob 2 */}
      <div className="absolute top-[40%] left-[-10%] w-[45vw] h-[45vw] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              JobShield
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How It Works</a>
            <a href="#stats" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Safety Metrics</a>
          </nav>

          {/* CTA / Actions */}
          <div className="flex items-center gap-4">
            {/* Settings Gear */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-slate-200/50 dark:border-slate-800 cursor-pointer"
              title="Appearance Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/auth")}
                  className="hidden sm:block px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-20 md:pb-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest animate-fade-in">
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Scam Protection
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white animate-slide-up">
              Securing Your <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-400 bg-clip-text text-transparent">Job Search</span> Experience with AI
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Every day, thousands of job seekers fall prey to sophisticated scams. JobShield uses state-of-the-art AI to instantly scan job postings, evaluate risks, and protect you from fraudulent recruitment.
            </p>

            {/* Mock Search/Scan Input */}
            <form 
              onSubmit={handleHeroScan} 
              className="max-w-xl mx-auto lg:mx-0 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center gap-2 animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex-1 flex items-center gap-2.5 pl-3">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input 
                  type="text" 
                  value={mockJobTitle}
                  onChange={(e) => setMockJobTitle(e.target.value)}
                  placeholder="Paste job title or company to start scanning..."
                  className="w-full bg-transparent text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer"
              >
                Scan Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-slate-400 dark:text-slate-500 text-xs font-semibold animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Real-Time Risk Scoring
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-indigo-500" />
                GDPR & HIPAA Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-blue-500" />
                Gemini-Powered Engine
              </span>
            </div>
          </div>

          {/* Hero Right Content (3D Image Stage) */}
          <div className="lg:col-span-5 relative flex justify-center items-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            
            {/* Stage Glowing Background */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-indigo-500 to-blue-500 opacity-20 rounded-full blur-[80px]" />
            
            {/* Main 3D Hero Image */}
            <div className="relative z-10 w-full max-w-[420px] transition-all hover:scale-[1.02] duration-500">
              <img 
                src="/images/landing_hero.png" 
                alt="JobShield Secure Workspace" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(99,102,241,0.25)] rounded-2xl"
              />

              {/* Floating Glassmorphic Metric 1 */}
              <div className="absolute top-[10%] left-[-15%] p-4 bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-3 animate-float pointer-events-none">
                <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Suspicious Activity</p>
                  <p className="text-sm font-bold text-rose-600 dark:text-rose-400">Scam Flag Detected</p>
                </div>
              </div>

              {/* Floating Glassmorphic Metric 2 */}
              <div className="absolute bottom-[10%] right-[-10%] p-4 bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-3 animate-float pointer-events-none" style={{ animationDelay: '2s' }}>
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Risk Assessment</p>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">98% Safety Score</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-100 dark:bg-slate-900/40 py-24 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Enterprise-Grade Protection</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Smart features to keep your search secure</p>
            <p className="text-slate-600 dark:text-slate-400">Our suite of security tools runs automated verification protocols to ensure that every opportunity you evaluate is verified and safe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Deep AI Scanning</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Parses job details to detect request patterns, domain age mismatches, and scam keywords automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Risk Scoring</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Computes a clean safety scale (High, Medium, Low Risk) based on custom rules combined with LLM analysis.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Exportable PDF Reports</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Generate clean, professional PDF summaries of any analyzed posting to share with peers or save offline.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">24/7 AI Scam Advisor</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                A chatbot integrated into your dashboard to clarify job safety details and answer general security queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">The Scanning Process</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">How JobShield protects you</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-emerald-500/20 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-500/5">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Input Details</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">
                Copy and paste the job posting description, company name, and title into our scan engine.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 border-2 border-blue-500 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-500/5">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Analysis Runs</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">
                Our model maps text vectors, scanning for indicators of phishing, payment scams, or ghost jobs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-purple-500/5">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">View Safety Report</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">
                Read a complete risk assessment including high-risk flags and a clear explanation paragraph.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-emerald-500/5">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Secure Application</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">
                Proceed with absolute confidence or save the report to protect other applicants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="bg-gradient-to-r from-indigo-900 to-slate-950 py-20 text-white relative z-10 overflow-hidden">
        {/* Glowing backgrounds */}
        <div className="absolute top-1/2 left-1/2 w-[60vw] h-[30vw] bg-indigo-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            {/* Stat 1 */}
            <div className="space-y-2">
              <p className="text-5xl font-black bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">120K+</p>
              <p className="text-lg font-bold text-indigo-300">Job Descriptions Scanned</p>
              <p className="text-sm text-slate-400">Protecting applicants worldwide from fraudulent posts.</p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2">
              <p className="text-5xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">99.8%</p>
              <p className="text-lg font-bold text-blue-300">Scam Detection Accuracy</p>
              <p className="text-sm text-slate-400">Powered by advanced rules combined with Google Gemini LLMs.</p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2">
              <p className="text-5xl font-black bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">45K+</p>
              <p className="text-lg font-bold text-emerald-300">Job Seeker Accounts Saved</p>
              <p className="text-sm text-slate-400">Intercepting scams before personal information is lost.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">JobShield</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Securing job searches around the globe with custom-trained machine learning heuristics and AI logic.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
              <a href="#features" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">How It Works</a>
              <a href="#stats" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Metrics</a>
            </div>
            <button 
              onClick={() => navigate("/auth")}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Analyze a Job Post
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="border-t border-slate-200/30 dark:border-slate-900/50 py-6 text-center text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} JobShield SaaS. All rights reserved.
        </div>
      </footer>
      <SettingsModal />
    </div>
  );
}

export default Landing;
