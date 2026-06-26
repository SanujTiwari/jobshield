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
  TrendingUp,
  Lock,
  Sparkles,
} from "lucide-react";
import { loginUser, registerUser, googleLoginUser } from "../services/authService";
import "./Auth.css";

function Auth() {
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

  // Password strength logic
  const passwordStrength = useMemo(() => {
    const pw = formData.password;
    if (!pw) return null;
    if (pw.length < 8) return { level: "weak", label: "Weak", hint: "Min 8 characters required", percent: 25, color: "bg-rose-500" };
    
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 2) return { level: "medium", label: "Medium", hint: "Add uppercase, numbers or symbols", percent: 55, color: "bg-amber-500" };
    if (score <= 3) return { level: "good", label: "Good", hint: "Almost there! Add more variety", percent: 75, color: "bg-blue-500" };
    return { level: "strong", label: "Strong", hint: "Excellent password!", percent: 100, color: "bg-emerald-500" };
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password length on register
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300 relative overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute top-[-15%] right-[-10%] w-[45vw] h-[45vw] bg-indigo-500/8 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[40vw] h-[40vw] bg-blue-500/8 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Card Container - single unified card */}
      <div className="auth-card relative z-10 w-full max-w-5xl mx-4 sm:mx-6 grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">

        {/* Left Side: Form */}
        <div className="auth-form-panel px-8 sm:px-12 py-10 sm:py-12 flex flex-col justify-center">

          {/* Logo */}
          <div className="auth-stagger-1 flex items-center gap-2.5 mb-8 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              JobShield
            </span>
          </div>

          {/* Heading */}
          <div className="auth-stagger-2 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1.5">
              {isLoginState ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isLoginState ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setIsLoginState(false); setFormData({ ...formData, password: "" }); }}
                    className="auth-signup-link font-bold cursor-pointer bg-transparent border-none p-0"
                  >
                    Sign up →
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setIsLoginState(true); setFormData({ ...formData, password: "" }); }}
                    className="auth-signin-link font-bold cursor-pointer bg-transparent border-none p-0"
                  >
                    Sign in →
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Form */}
          <form className="auth-stagger-3 space-y-4" onSubmit={handleSubmit}>

            {/* Full Name (Register only) */}
            {!isLoginState && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                {isLoginState && (
                  <button
                    type="button"
                    onClick={() => toast.error("Password reset link sent to registered email")}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>

              {/* Password Strength Meter (Register only) */}
              {!isLoginState && formData.password.length > 0 && passwordStrength && (
                <div className="pt-1.5 space-y-1.5 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.percent}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold ${
                      passwordStrength.level === "weak" ? "text-rose-500" :
                      passwordStrength.level === "medium" ? "text-amber-500" :
                      passwordStrength.level === "good" ? "text-blue-500" :
                      "text-emerald-500"
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    {passwordStrength.hint}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="auth-submit-btn w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20 cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLoginState ? "Sign in" : "Create account"}
                  <ArrowRight className="w-4 h-4 auth-arrow-icon" />
                </>
              )}
            </button>
          </form>

          {/* Google Login */}
          <div className="auth-stagger-4 mt-4">
          <button
            onClick={() => loginGoogle()}
            className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </button>
          </div>

        </div>

        {/* Right Side: Brand Panel (Connected, same card) */}
        <div className="auth-brand-panel hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-600 p-12 relative overflow-hidden">

          {/* Decorative circles - animated */}
          <div className="auth-deco-circle-1 absolute top-[-20%] right-[-15%] w-80 h-80 bg-white/5 rounded-full" />
          <div className="auth-deco-circle-2 absolute bottom-[-15%] left-[-10%] w-64 h-64 bg-white/5 rounded-full" />
          <div className="auth-deco-circle-3 absolute top-[40%] right-[10%] w-40 h-40 bg-blue-400/10 rounded-full blur-xl" />

          <div className="relative z-10 text-center space-y-8 max-w-sm">
            {/* Shield Icon */}
            <div className="auth-shield-icon mx-auto w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/10">
              <Shield className="w-10 h-10 text-white" />
            </div>

            <div className="auth-brand-text space-y-3">
              <h3 className="text-2xl font-extrabold text-white">
                Protect Your Job Search
              </h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">
                AI-powered job fraud detection that scans postings, evaluates risks, and keeps you safe from scam recruiters.
              </p>
            </div>

            {/* Trust metrics */}
            <div className="space-y-3 pt-4">
              <div className="auth-metric-1 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">99.8% Accuracy</p>
                  <p className="text-[10px] text-indigo-200/70">Scam detection rate</p>
                </div>
              </div>

              <div className="auth-metric-2 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-blue-300" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">120K+ Scanned</p>
                  <p className="text-[10px] text-indigo-200/70">Job postings analyzed</p>
                </div>
              </div>

              <div className="auth-metric-3 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <div className="w-8 h-8 bg-indigo-300/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-indigo-300" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Fully Encrypted</p>
                  <p className="text-[10px] text-indigo-200/70">Your data stays private</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Auth;
