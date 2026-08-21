import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import {
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  KeyRound,
  Mail,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { loginUser, registerUser, googleLoginUser } from "../services/authService";
import Navbar from "../components/Navbar";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginState, setIsLoginState] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (location.state?.tab === "signup") {
      setIsLoginState(false);
    }
  }, [location]);

  // Password strength calculator
  const passwordStrength = useMemo(() => {
    const pw = formData.password;
    if (!pw) return null;
    if (pw.length < 8) return { level: "weak", label: "Weak", hint: "Min 8 characters required", percent: 25, color: "text-red-500" };
    
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 2) return { level: "medium", label: "Medium", hint: "Add uppercase/numbers", percent: 55, color: "text-amber-500" };
    if (score <= 3) return { level: "good", label: "Good", hint: "Strong combo", percent: 75, color: "text-blue-500" };
    return { level: "strong", label: "Strong", hint: "Excellent password!", percent: 100, color: "text-emerald-500" };
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoginState && formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      if (isLoginState) {
        const res = await loginUser({ email: formData.email, password: formData.password });
        localStorage.setItem("token", res.token);
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        if (!formData.name) {
          toast.error("Full Name is required");
          setIsLoading(false);
          return;
        }
        const res = await registerUser(formData);
        localStorage.setItem("token", res.token);
        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || `${isLoginState ? 'Login' : 'Registration'} failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await googleLoginUser(tokenResponse.access_token);
        localStorage.setItem("token", res.token);
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.response?.data?.message || "Google login failed");
      }
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] flex flex-col justify-between overflow-x-hidden font-sans transition-colors duration-300">
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 sm:px-6 my-8 w-full flex-1 flex items-center justify-center">
          {/* Main Container */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-[var(--line)] bg-[var(--panel)] shadow-xl overflow-hidden relative">
            
            {/* Left Column: Form Panel */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center bg-[var(--panel)]">
              
              {/* Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                  <span className="font-sans text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                    Authentication Portal
                  </span>
                </div>

                <h1 className="font-display font-bold text-3xl tracking-tight text-[var(--ink)]">
                  {isLoginState ? "Sign In to JobShield" : "Create Account"}
                </h1>
                
                <p className="text-xs text-[var(--ink-dim)]">
                  {isLoginState ? (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setIsLoginState(false)}
                        className="font-sans text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        Sign up free &rarr;
                      </button>
                    </>
                  ) : (
                    <>
                      Already registered?{" "}
                      <button
                        type="button"
                        onClick={() => setIsLoginState(true)}
                        className="font-sans text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        Sign in &rarr;
                      </button>
                    </>
                  )}
                </p>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <AnimatePresence mode="wait">
                  {!isLoginState && (
                    <motion.div
                      key="nameField"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1.5"
                    >
                      <label className="font-sans text-xs font-semibold text-[var(--ink-dim)]">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[var(--ink-dim)] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full pl-10 pr-4 py-2.5 text-[14px] rounded-xl bg-[var(--panel-secondary)] border border-[var(--line)] focus:border-indigo-500 text-[var(--ink)] outline-none transition-all placeholder-[var(--ink-dim)]/40"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-semibold text-[var(--ink-dim)]">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[var(--ink-dim)] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 text-[14px] rounded-xl bg-[var(--panel-secondary)] border border-[var(--line)] focus:border-indigo-500 text-[var(--ink)] outline-none transition-all placeholder-[var(--ink-dim)]/40"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-sans text-xs font-semibold text-[var(--ink-dim)]">
                      Password *
                    </label>
                    {isLoginState && (
                      <button
                        type="button"
                        onClick={() => toast.error("Password reset available via support email")}
                        className="font-sans text-xs text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[var(--ink-dim)] absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-[14px] rounded-xl bg-[var(--panel-secondary)] border border-[var(--line)] focus:border-indigo-500 text-[var(--ink)] outline-none transition-all placeholder-[var(--ink-dim)]/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {!isLoginState && passwordStrength && (
                    <div className="pt-1 space-y-1">
                      <div className="flex justify-between font-sans text-[10px] font-semibold uppercase">
                        <span className="text-[var(--ink-dim)]">Strength: {passwordStrength.label}</span>
                        <span className={passwordStrength.color}>{passwordStrength.hint}</span>
                      </div>
                      <div className="w-full h-1 bg-[var(--panel-secondary)] rounded-full overflow-hidden border border-[var(--line)]">
                        <div
                          className="h-full bg-indigo-600 transition-all duration-300"
                          style={{ width: `${passwordStrength.percent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full font-sans text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        {isLoginState ? "Sign In" : "Register"} <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="relative flex items-center justify-center my-3">
                    <div className="border-t border-[var(--line)] w-full" />
                    <span className="font-sans text-[9px] uppercase tracking-wider text-[var(--ink-dim)] bg-[var(--panel)] px-3 absolute font-bold">
                      OR
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => loginGoogle()}
                    className="w-full font-sans text-xs border border-[var(--line)] bg-[var(--panel)] hover:bg-[var(--panel-secondary)] text-[var(--ink)] py-3 rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer font-bold shadow-xs"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Premium Showcase Panel */}
            <div className="lg:col-span-5 bg-[var(--panel-secondary)] border-t lg:border-t-0 lg:border-l border-[var(--line)] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-sans text-[10px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                    Pro Scam Shield
                  </span>
                </div>

                <h2 className="font-display font-bold text-2xl tracking-tight leading-tight text-[var(--ink)]">
                  Verify before you trust.
                </h2>

                <p className="text-xs text-[var(--ink-dim)] leading-relaxed font-medium">
                  Scan suspicious communications, check domain certificates, audit advance deposit requests, and generate safety files instantly.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    "Multi-Source Risk Aggregation",
                    "Domain SSL & Heuristics Check",
                    "Session Privacy Encrypted",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl border border-[var(--line)] bg-[var(--panel)] shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="font-sans text-xs text-[var(--ink)] font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--line)] font-sans text-[10px] text-[var(--ink-dim)] flex items-center justify-between relative z-10 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-indigo-500" /> JobShield Secure
                </span>
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-4 text-center border-t border-[var(--line)] bg-[var(--panel)]">
          <p className="font-sans text-[10px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
            JobShield Platform &copy; 2026. Secure Assessment Intake.
          </p>
        </footer>
      </div>
    </div>
  );
}
