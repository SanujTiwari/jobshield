import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, Flag, Settings, LogOut, ChevronDown, Menu, X, BarChart3, Plus, FileCheck, Home, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserProfile } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token && !!user;

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const response = await getUserProfile();
        setUser(response.user);
      } catch (error) {
        console.error('Failed to load user profile');
        localStorage.removeItem('token');
        setUser(null);
      }
    };
    loadUser();
  }, [token, location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setShowDropdown(false);
    setShowMobileMenu(false);
    navigate('/auth');
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/safety-center', label: 'Safety Center', icon: Shield },
    ...(isAuthenticated ? [
      { path: '/scanner', label: 'Scanner', icon: Plus },
      { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
      { path: '/history', label: 'History', icon: FileCheck },
      { path: '/report-scam', label: 'Report Scam', icon: Flag },
    ] : []),
    ...(isAuthenticated && user?.role === 'admin' ? [{ path: '/admin', label: 'Admin Console', icon: Shield }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[var(--paper)]/90 dark:bg-[var(--paper)]/85 backdrop-blur-xl border-b border-[var(--line)] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="group flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--ink)] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-4 h-4 text-[var(--paper)]" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[17px] tracking-tight text-[var(--ink)] leading-none">
                ScamShield
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink-dim)] mt-0.5">
                AI Fraud Intel
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-[var(--panel)]/60 p-1 border border-[var(--line)] rounded-full shadow-xs">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[var(--ink)] font-semibold'
                      : 'text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 rounded-full bg-[var(--paper)] border border-[var(--line)] shadow-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {link.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              /* Logged In: Profile Dropdown */
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--ink-dim)] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <div className="w-6 h-6 rounded-md bg-[var(--ink)] flex items-center justify-center font-mono text-[11px] font-bold text-[var(--paper)]">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="font-mono text-[12px] text-[var(--ink)] max-w-[110px] truncate font-medium">
                    {user?.name || 'User'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[var(--ink-dim)] transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-64 rounded-xl bg-[var(--panel)] border border-[var(--line)] shadow-xl py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[var(--line)] bg-[var(--paper)]/60">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink-dim)] block font-semibold">Account Clearance</span>
                        <p className="font-display font-semibold text-sm text-[var(--ink)] mt-0.5">{user?.name || 'User'}</p>
                        <p className="font-mono text-xs text-[var(--ink-dim)] truncate mt-0.5">{user?.email || ''}</p>
                      </div>
                      <div className="p-1">
                        <button
                          onClick={() => { setShowDropdown(false); navigate('/dashboard'); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider text-[var(--ink)] hover:bg-[var(--paper)] transition-colors cursor-pointer"
                        >
                          <BarChart3 className="w-3.5 h-3.5 text-[var(--ink-dim)]" />
                          My Case Files
                        </button>
                        <button
                          onClick={() => { setShowDropdown(false); navigate('/report-scam'); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider text-[var(--ink)] hover:bg-[var(--paper)] transition-colors cursor-pointer"
                        >
                          <Flag className="w-3.5 h-3.5 text-[var(--ink-dim)]" />
                          Report Opportunity
                        </button>
                      </div>
                      <div className="border-t border-[var(--line)] my-1" />
                      <div className="p-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider text-[var(--flag)] hover:bg-[var(--flag-bg)] transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Logged Out: Get Started Button */
              <button
                onClick={() => navigate('/auth')}
                className="group font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink)]/90 px-4 py-2 rounded-lg transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
              >
                Sign In
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)]"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-3 border-t border-[var(--line)] space-y-1 bg-[var(--paper)] overflow-hidden"
            >
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => { navigate(link.path); setShowMobileMenu(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-widest ${
                      isActive
                        ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold'
                        : 'text-[var(--ink-dim)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </button>
                );
              })}
              {isAuthenticated ? (
                <div className="mt-2 pt-2 border-t border-[var(--line)] space-y-1">
                  <div className="px-4 py-2 bg-[var(--panel)] border border-[var(--line)] rounded-lg mx-2">
                    <p className="font-display font-semibold text-xs text-[var(--ink)]">{user?.name}</p>
                    <p className="font-mono text-[10px] text-[var(--ink-dim)] truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[var(--flag)] hover:bg-[var(--flag-bg)]"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="p-2">
                  <button
                    onClick={() => { setShowMobileMenu(false); navigate('/auth'); }}
                    className="w-full font-mono text-[11px] uppercase tracking-widest bg-[var(--ink)] text-[var(--paper)] py-2.5 rounded-lg"
                  >
                    Sign In &rarr;
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;