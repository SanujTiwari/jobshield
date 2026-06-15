import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  ChevronRight 
} from "lucide-react";
import { loginUser, registerUser, googleLoginUser } from "../services/authService";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Toggle between sign in and sign up
  const [isLoginState, setIsLoginState] = useState(true);
  
  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Set default tab based on path or redirect
  useEffect(() => {
    if (location.state?.tab === "signup") {
      setIsLoginState(false);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLoginState) {
        // Sign In Flow
        const res = await loginUser({ email: formData.email, password: formData.password });
        localStorage.setItem("token", res.token);
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        // Sign Up Flow
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
    <div className="min-h-screen bg-white dark:bg-slate-950 flex transition-colors duration-300 font-sans">
      
      {/* Left Column: Clean White Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-16 lg:px-24 xl:px-32 z-10 bg-white dark:bg-slate-950 transition-colors duration-300">
        
        <div className="mx-auto w-full max-w-[420px] animate-slide-up">
          
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Shield className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-[#3d3935] dark:text-white">
              JobShield
            </span>
          </div>

          {/* Heading and Toggle Option */}
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-[#3d3935] dark:text-white tracking-tight mb-2">
              {isLoginState ? "Log in" : "Create account"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {isLoginState ? (
                <>
                  or{" "}
                  <button 
                    type="button" 
                    onClick={() => setIsLoginState(false)}
                    className="text-[#e98545] dark:text-[#f2995e] font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
                  >
                    create an account
                  </button>
                  {" "}if you don't have one yet
                </>
              ) : (
                <>
                  or{" "}
                  <button 
                    type="button" 
                    onClick={() => setIsLoginState(true)}
                    className="text-[#e98545] dark:text-[#f2995e] font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
                  >
                    sign in
                  </button>
                  {" "}if you already have an account
                </>
              )}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Full Name field (Only shown in Sign Up) */}
            {!isLoginState && (
              <div className="space-y-2 animate-fade-in">
                <label className="block text-sm font-bold text-[#3d3935] dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full px-4 py-3.5 rounded-2xl bg-[#f7f5f0] dark:bg-slate-900 border border-transparent focus:border-[#e98545] dark:focus:border-indigo-500 text-[#3d3935] dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-950 focus:ring-1 focus:ring-[#e98545] outline-none transition-all sm:text-sm font-medium shadow-inner"
                  placeholder="e.g. John Doe"
                />
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-bold text-[#3d3935] dark:text-slate-300">
                  Username or email
                </label>
                {isLoginState && (
                  <button 
                    type="button"
                    onClick={() => toast.error("Please contact support to recover username")}
                    className="text-xs font-bold text-[#e98545] hover:underline cursor-pointer"
                  >
                    I can't remember
                  </button>
                )}
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full px-4 py-3.5 rounded-2xl bg-[#f7f5f0] dark:bg-slate-900 border border-transparent focus:border-[#e98545] dark:focus:border-indigo-500 text-[#3d3935] dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-950 focus:ring-1 focus:ring-[#e98545] outline-none transition-all sm:text-sm font-medium shadow-inner"
                placeholder="mike142@yourmail.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#3d3935] dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-4 pr-12 py-3.5 rounded-2xl bg-[#f7f5f0] dark:bg-slate-900 border border-transparent focus:border-[#e98545] dark:focus:border-indigo-500 text-[#3d3935] dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-950 focus:ring-1 focus:ring-[#e98545] outline-none transition-all sm:text-sm font-medium shadow-inner"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#e98545] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me / Forgot Password */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <label className="flex items-center gap-2 cursor-pointer text-[#3d3935] dark:text-slate-300">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-slate-300 text-[#e98545] focus:ring-[#e98545]"
                />
                Remember me
              </label>
              {isLoginState && (
                <button 
                  type="button"
                  onClick={() => toast.error("Password reset link sent to registered email")}
                  className="text-[#e98545] hover:underline cursor-pointer"
                >
                  I forgot the password
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 rounded-2xl shadow-md text-sm font-bold text-white bg-[#e98545] hover:bg-[#d67232] focus:outline-none focus:ring-2 focus:ring-[#e98545] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLoginState ? "Log me in" : "Register me"}
                </>
              )}
            </button>
          </form>

          {/* Social Sign In (Google) */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white dark:bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  or
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => loginGoogle()}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-sm font-bold text-[#3d3935] dark:text-slate-300 focus:outline-none transition-all shadow-sm cursor-pointer"
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
                Log in with Google
              </button>
              
              <button
                type="button"
                onClick={() => toast.error("Apple integration coming soon!")}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-sm font-bold text-[#3d3935] dark:text-slate-300 focus:outline-none transition-all shadow-sm cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94.12.02.24.03.36.03.85 0 1.97-.55 2.45-1.36" />
                </svg>
                Log in with Apple
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Right Column: Warm Beige Background & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#eae4d9] dark:bg-slate-900 justify-center items-center relative p-12 overflow-hidden border-l border-slate-200/20">
        
        {/* Decorative Circle matching illustration */}
        <div className="absolute top-[10%] left-[10%] w-[12vw] h-[12vw] bg-[#e3bc6a]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-[480px] w-full z-10 flex flex-col justify-center items-center">
          {/* Main 2D Flat Illustration */}
          <div className="w-full h-auto transition-all hover:scale-[1.02] duration-500">
            <img 
              src="/images/auth_illustration_new.png" 
              alt="Security Analysis Illustration" 
              className="w-full h-auto object-contain rounded-2xl drop-shadow-md"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Auth;
