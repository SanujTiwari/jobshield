import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, Flag, LogOut, ChevronDown, Menu, X, BarChart3, Plus, FileCheck, Home, ArrowRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserProfile } from "../services/authService";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, updateSetting } = useTheme();
  
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token && !!user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const toggleTheme = () => {
    updateSetting("darkMode", !darkMode);
  };

  const navLinks = location.pathname === "/" ? [
    { path: '/', label: 'Home', isAnchor: false },
    { path: '#how-it-works', label: 'How It Works', isAnchor: true },
    { path: '#features', label: 'Features', isAnchor: true },
    { path: '/safety-center', label: 'Safety Center', isAnchor: false },
  ] : [
    { path: '/', label: 'Home', icon: Home },
    { path: '/safety-center', label: 'Safety Center', icon: Shield },
    ...(isAuthenticated ? [
      { path: '/scanner', label: 'Scanner', icon: Plus },
      { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
      { path: '/history', label: 'History', icon: FileCheck },
      { path: '/report-scam', label: 'Report Scam', icon: Flag },
    ] : []),
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? "bg-[var(--panel)]/80 backdrop-blur-md border-[var(--line)] shadow-xs"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="group flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-blue-500 p-[1.5px] shadow-sm">
            <div className="w-full h-full bg-[var(--panel)] rounded-[7px] flex items-center justify-center">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" strokeWidth={2.2} />
            </div>
          </div>
          <span className="font-display font-bold text-[17px] tracking-tight text-[var(--ink)] flex items-center gap-1.5">
            JobShield
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            if (link.isAnchor) {
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className="font-sans text-xs font-semibold text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`font-sans text-xs font-semibold transition-colors cursor-pointer relative py-1 ${
                  isActive ? "text-indigo-600 dark:text-indigo-400" : "text-[var(--ink-dim)] hover:text-[var(--ink)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600 dark:bg-indigo-400"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Items */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] hover:bg-[var(--panel-secondary)] text-[var(--ink-dim)] hover:text-[var(--ink)] transition-all cursor-pointer shadow-xs"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {isAuthenticated ? (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--panel)] hover:bg-[var(--panel-secondary)] transition-all cursor-pointer shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center font-sans text-[10px] font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="font-sans text-xs text-[var(--ink)] max-w-[100px] truncate font-medium">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[var(--ink-dim)] transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-60 rounded-xl bg-[var(--panel)] border border-[var(--line)] shadow-xl py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-[var(--line)] bg-[var(--paper)]">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block font-bold">Clearance Level</span>
                      <p className="font-display font-semibold text-sm text-[var(--ink)] mt-0.5">{user?.name || 'User'}</p>
                      <p className="font-sans text-xs text-[var(--ink-dim)] truncate">{user?.email || ''}</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => { setShowDropdown(false); navigate('/dashboard'); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-sans text-xs text-[var(--ink)] hover:bg-[var(--paper)] transition-colors cursor-pointer"
                      >
                        <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => { setShowDropdown(false); navigate('/report-scam'); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-sans text-xs text-[var(--ink)] hover:bg-[var(--paper)] transition-colors cursor-pointer"
                      >
                        <Flag className="w-3.5 h-3.5 text-red-500" />
                        Report Threat
                      </button>
                    </div>
                    <div className="border-t border-[var(--line)] my-1" />
                    <div className="p-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-sans text-xs text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
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
            <button
              onClick={() => navigate('/auth')}
              className="group font-sans text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98] shadow-xs"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)]"
          >
            {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-4 rounded-2xl bg-[var(--panel)] border border-[var(--line)] space-y-2 shadow-xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  if (link.isAnchor) {
                    window.location.href = link.path;
                  } else {
                    navigate(link.path);
                  }
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-sans text-xs font-semibold text-[var(--ink-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper)] text-left"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[var(--line)]">
              <button
                onClick={() => { setShowMobileMenu(false); navigate('/auth'); }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs py-2.5 rounded-xl font-bold text-center"
              >
                Get Started &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;