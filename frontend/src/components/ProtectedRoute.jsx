import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

/**
 * ProtectedRoute - Redirects unauthenticated users to /auth.
 * Passes the attempted location in state so Auth can redirect back on login.
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      toast.error("Authentication required. Please sign in to access scam scanning & case files.");
    }
  }, [token]);

  if (!token) {
    return (
      <Navigate
        to="/auth"
        state={{ from: location, redirectReason: "auth_required" }}
        replace
      />
    );
  }

  return children;
}
