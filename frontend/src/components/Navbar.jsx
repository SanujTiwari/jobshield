import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, Settings, LogOut, ChevronDown, Menu, X, BarChart3, Plus, FileCheck, Home } from "lucide-react";
import { getUserProfile } from "../services/authService";
import { useTheme } from "../context/ThemeContext";
import SettingsModal from "./SettingsModal";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { setIsSettingsOpen } = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.user);
      } catch (error) {
        console.error('Failed to load user profile');
      }
    };
    loadUser();
  }, []);

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
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/analyze', label: 'Scanner', icon: Plus },
    { path: '/history', label: 'History', icon: FileCheck },
    { path: '/resume-match', label: 'Resume Match', icon: FileCheck },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[var(--paper)]/95 border-b border-[var(--line)] backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-7 h-7 bg-[var(--ink)] flex items-center justify-center">
              <Shield className="w-4 h-4 text-[var(--verified-bg)]" strokeWidth={2} />
            </div>
            <span className="font-display font-semibold text-[18px] tracking-tight text-[var(--ink)]">
              ScamShield
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'border-b-2 border-[var(--ink)] text-[var(--ink)] font-semibold'
                      : 'text-[var(--ink-dim)] hover:text-[var(--ink)]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Settings Gear */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 border border-[var(--line)] bg-[var(--panel)] text-[var(--ink-dim)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-all cursor-pointer"
              title="Appearance Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--ink)] transition-all"
              >
                <div className="w-6 h-6 bg-[var(--ink)] flex items-center justify-center font-mono text-[11px] font-bold text-[var(--paper)]">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="font-mono text-[12px] text-[var(--ink)] max-w-[120px] truncate">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[var(--ink-dim)] transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-[var(--panel)] border border-[var(--line)] shadow-lg py-2 animate-scale-in z-50">
                  <div className="px-4 py-3 border-b border-[var(--line)]">
                    <p className="font-display font-semibold text-sm text-[var(--ink)]">{user?.name || 'User'}</p>
                    <p className="font-mono text-xs text-[var(--ink-dim)] truncate">{user?.email || ''}</p>
                  </div>
                  <button
                    onClick={() => { setShowDropdown(false); setIsSettingsOpen(true); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[var(--ink)] hover:bg-[var(--paper)] transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-[var(--ink-dim)]" />
                    Appearance Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[var(--flag)] hover:bg-[var(--flag-bg)] transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-slate-700 animate-slide-up">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => { navigate(link.path); setShowMobileMenu(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </button>
              );
            })}
            {user && (
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="px-4 py-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
                <button
                  onClick={() => { setShowMobileMenu(false); setIsSettingsOpen(true); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Appearance Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-600 dark:text-rose-400"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <SettingsModal />
    </nav>
  );
}

export default Navbar;