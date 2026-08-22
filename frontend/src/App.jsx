import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AnalyzeJob from "./pages/AnalyzeJob";
import Scanner from "./pages/Scanner";
import History from "./pages/History";
import ReportScam from "./pages/ReportScam";
import AdminDashboard from "./pages/AdminDashboard";
import SafetyCenter from "./pages/SafetyCenter";
import ResumeMatch from "./pages/ResumeMatch";
import ProtectedRoute from "./components/ProtectedRoute";

/** Inline 404 page shown when no route matches. */
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="text-xl font-semibold text-[var(--ink)]">Page not found</p>
      <p className="text-[var(--ink-dim)] max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all cursor-pointer"
      >
        Go Home
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#1e293b',
            color: '#f1f5f9',
            fontSize: '14px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#f1f5f9',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#f1f5f9',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/safety-center" element={<SafetyCenter />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Navigate to="/auth" />} />
        <Route path="/register" element={<Navigate to="/auth" />} />

        {/* Protected Routes (Requires Login) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/analyze" element={<ProtectedRoute><AnalyzeJob /></ProtectedRoute>} />
        <Route path="/scanner" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/report-scam" element={<ProtectedRoute><ReportScam /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/resume-match" element={<ProtectedRoute><ResumeMatch /></ProtectedRoute>} />

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;