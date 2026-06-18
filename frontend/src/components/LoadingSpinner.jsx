import React from "react";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>

          <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
        </div>

        {/* Text */}
        <p className="text-slate-300 text-sm font-medium tracking-wide">
          Analyzing Job Posting...
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;