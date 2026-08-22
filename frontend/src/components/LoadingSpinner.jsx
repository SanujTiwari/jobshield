/**
 * LoadingSpinner - Full-screen overlay spinner shown during AI analysis.
 * @param {string} [text="Analyzing"] - Action verb displayed before the animated word list
 */
function LoadingSpinner({ text = "Analyzing" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--paper)]/85 backdrop-blur-sm animate-fade-in">
      <div className="uiverse-card border border-[var(--line)] flex flex-col items-center gap-3 text-center">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-dim)]">
          JobShield Analysis Engine
        </div>
        
        <div className="uiverse-loader">
          <span>{text}</span>
          <div className="uiverse-words">
            <span className="uiverse-word">job postings</span>
            <span className="uiverse-word">messages</span>
            <span className="uiverse-word">payments</span>
            <span className="uiverse-word">recruiters</span>
            <span className="uiverse-word">URL links</span>
          </div>
        </div>

        <p className="font-mono text-[11px] text-[var(--ink-dim)]">
          Evaluating risk signals against pattern rule sets...
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;