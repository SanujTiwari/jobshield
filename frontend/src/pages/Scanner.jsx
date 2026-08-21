import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import ScannerForm from "../components/ScannerForm";
import RiskCard from "../components/RiskCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ChatBot from "../components/ChatBot";

import {
  scanJob,
  scanMessage,
  scanPayment,
  scanRecruiter,
  scanUrl,
} from "../services/scanService";

export default function Scanner() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const initialScanText = location.state?.initialScan || "";

  const handleScanSubmit = async (scanType, formData) => {
    setIsLoading(true);
    setScanResult(null);

    try {
      let response;
      if (scanType === "job") {
        response = await scanJob(formData);
      } else if (scanType === "message") {
        response = await scanMessage(formData);
      } else if (scanType === "payment") {
        response = await scanPayment(formData);
      } else if (scanType === "recruiter") {
        response = await scanRecruiter(formData);
      } else if (scanType === "url") {
        response = await scanUrl(formData);
      }

      if (response && response.scan) {
        setScanResult(response.scan);
        toast.success("Case file generated successfully!");
      } else {
        toast.error("Failed to generate scan report");
      }
    } catch (error) {
      console.error("Scan submission error:", error);
      toast.error(error.response?.data?.message || "Failed to complete scan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-sans transition-colors duration-300">
      {isLoading && <LoadingSpinner message="Auditing indicators against threat database..." />}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Page Title Header */}
        <div className="max-w-2xl mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            <span className="font-sans text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
              Verification Engine
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--ink)]">
            Multi-Type Scam Scanner
          </h1>
          <p className="text-[var(--ink-dim)] text-sm leading-relaxed">
            Select a scanner category below. JobShield evaluates submitted details against rule sets, pattern indicators, and AI analysis.
          </p>
        </div>

        {/* Scanner Form */}
        <ScannerForm
          onSubmit={handleScanSubmit}
          isLoading={isLoading}
          initialScanText={initialScanText}
        />

        {/* Explainable Results Section */}
        {scanResult && (
          <RiskCard
            scan={scanResult}
            onReset={() => setScanResult(null)}
          />
        )}
      </main>

      <ChatBot />
    </div>
  );
}
