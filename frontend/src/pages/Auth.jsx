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
  CheckCircle2,
} from "lucide-react";
import { loginUser, registerUser, googleLoginUser } from "../services/authService";
import Navbar from "../components/Navbar";
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
    if (pw.length < 8) return { level: "weak", label: "Weak", hint: "Min 8 characters required", percent: 25, color: "text-[var(--flag)]" };
    
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 2) return { level: "medium", label: "Medium", hint: "Add uppercase or numbers", percent: 55, color: "text-[var(--caution)]" };
    if (score <= 3) return { level: "good", label: "Good", hint: "Strong combination", percent: 75, color: "text-blue-600" };
    return { level: "strong", label: "Strong", hint: "Excellent password!", percent: 100, color: "text-[var(--verified)]" };
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
    <div className="js-root min-h-screen bg-[var(--paper)] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 my-10 w-full flex-1 flex items-center justify-center">
        {/* Main Editorial Card Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 border border-[var(--line)] bg-[var(--panel)] shadow-lg overflow-hidden">
          
          {/* Left Column: Auth Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
            
            {/* Header Badge */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest border border-[var(--line)] px-2.5 py-1 text-[var(--ink-dim)] bg-[var(--paper)]">
                AUTHENTICATION PORTAL // CASE CLEARANCE
              </span>
              <h1 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
                {isLoginState ? "Sign In to ScamShield" : "Create Investigator Account"}
              </h1>
              <p className="text-[14px] text-[var(--ink-dim)]">
                {isLoginState ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setIsLoginState(false)}
                      className="font-mono text-[12px] uppercase font-bold text-[var(--ink)] hover:underline cursor-pointer"
                    >
                      Sign up free →
                    </button>
                  </>
                ) : (
                  <>
                    Already registered?{" "}
                    <button
                      onClick={() => setIsLoginState(true)}
                      className="font-mono text-[12px] uppercase font-bold text-[var(--ink)] hover:underline cursor-pointer"
                    >
                      Sign in →
                    </button>
                  </>
                )}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              {!isLoginState && (
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-2.5 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-dim)] font-semibold">
                    Password *
                  </label>
                  {isLoginState && (
                    <button
                      type="button"
                      onClick={() => toast.error("Password reset functionality available via admin email")}
                      className="font-mono text-[10px] uppercase text-[var(--ink-dim)] hover:text-[var(--ink)]"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 text-[14px] bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--ink)] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[var(--ink-dim)] hover:text-[var(--ink)]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {!isLoginState && passwordStrength && (
                  <div className="pt-1 space-y-1">
                    <div className="flex justify-between font-mono text-[10px] uppercase">
                      <span className="text-[var(--ink-dim)]">Strength: {passwordStrength.label}</span>
                      <span className={passwordStrength.color}>{passwordStrength.hint}</span>
                    </div>
                    <div className="w-full h-1 bg-[var(--line)]">
                      <div
                        className="h-1 bg-[var(--ink)] transition-all duration-300"
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
                  className="w-full font-mono text-[12px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--verified)] py-3.5 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    "Verifying Credentials..."
                  ) : (
                    <>
                      {isLoginState ? "Sign In to Case Files" : "Complete Registration"} <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="relative flex items-center justify-center my-3">
                  <div className="border-t border-[var(--line)] w-full" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)] bg-[var(--panel)] px-3 absolute">
                    OR
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => loginGoogle()}
                  className="w-full font-mono text-[11px] uppercase tracking-wider border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-[var(--ink)] py-3 transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
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

          {/* Right Column: Dark Band Editorial Showcase */}
          <div className="lg:col-span-5 bg-[#14161B] text-[var(--paper)] p-8 sm:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[var(--line)] relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="inline-block border border-[var(--paper)]/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#E1DFD5]">
                SCAMSHIELD // MULTI-TYPE DEFENSE
              </div>

              <h2 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight leading-tight text-white">
                Detect Scams Before They Cost You.
              </h2>

              <p className="text-[13.5px] text-[#A2A6B0] leading-relaxed">
                Scan job postings, recruiter messages, payment requests, company information, and URLs with plain-language explanations.
              </p>

              <div className="space-y-3 pt-4">
                {[
                  "99.8% Multi-Source Signal Scoring",
                  "120,000+ Evidence Scans Evaluated",
                  "Encrypted & No Personal Data Sold",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-[var(--paper)]/15 bg-[var(--paper)]/5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--verified)] flex-shrink-0" />
                    <span className="font-mono text-[12px] text-white tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-[var(--paper)]/15 text-[11px] font-mono text-[#A2A6B0] flex justify-between items-center relative z-10">
              <span>ScamShield Security v2.5</span>
              <span>256-Bit SSL</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Auth;
