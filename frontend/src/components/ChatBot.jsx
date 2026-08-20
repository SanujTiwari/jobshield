import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { sendChatMessage } from "../services/chatService";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m ScamShield AI 🛡️ I can help you identify suspicious job postings, recruiter messages, payment requests, URLs, and scam tactics. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const quickQuestions = [
    'What are common scam red flags?',
    'Is it safe to pay a registration fee?',
    'How to verify a recruiter or company?',
  ];

  const handleSend = async (messageText) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text);
      setMessages(prev => [...prev, { role: 'assistant', content: response.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble responding right now. Please try again in a moment.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[500px] bg-[var(--panel)] border border-[var(--line)] shadow-2xl flex flex-col z-50 animate-scale-in overflow-hidden">
          {/* Dark Band Header */}
          <div className="bg-[#14161B] text-[var(--paper)] px-4 py-3.5 flex items-center justify-between flex-shrink-0 border-b border-[var(--line)]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-[var(--paper)] text-[var(--ink)] flex items-center justify-center font-mono text-[10px] font-bold">
                AI
              </div>
              <div>
                <h3 className="font-display text-[14px] font-semibold text-white tracking-tight">ScamShield AI Assistant</h3>
                <p className="font-mono text-[10px] text-[#A2A6B0]">Threat Intelligence Unit</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--paper)]/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-1">
                    AI
                  </div>
                )}
                <div className={`max-w-[85%] px-3.5 py-2.5 text-[13.5px] leading-relaxed border ${
                  msg.role === 'user'
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                    : 'bg-[var(--panel)] text-[var(--ink)] border-[var(--line)]'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0">
                  AI
                </div>
                <div className="px-3 py-2 bg-[var(--panel)] border border-[var(--line)] font-mono text-[11px] text-[var(--ink-dim)]">
                  Analyzing database...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Prompt */}
          {messages.length < 3 && (
            <div className="p-3 bg-[var(--panel)] border-t border-[var(--line)] flex flex-wrap gap-1.5 flex-shrink-0">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="font-mono text-[10px] text-[var(--ink-dim)] hover:text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)] px-2 py-1 bg-[var(--paper)] transition-colors cursor-pointer text-left truncate max-w-full"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="border-t border-[var(--line)] p-3 bg-[var(--panel)] flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about scam signals or verify URLs..."
                disabled={isLoading}
                className="flex-1 bg-[var(--paper)] border border-[var(--line)] px-3.5 py-2 text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-dim)] focus:border-[var(--ink)] outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--verified)] transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editorial Floating Trigger Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:right-6 bg-[var(--ink)] text-[var(--paper)] border border-[var(--line)] px-4 py-2.5 shadow-xl hover:bg-[var(--verified)] transition-all duration-200 flex items-center gap-2.5 z-50 cursor-pointer font-mono text-[11px] uppercase tracking-widest"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        {isOpen ? (
          <>Close AI <X className="w-3.5 h-3.5" /></>
        ) : (
          <>ScamShield AI <MessageCircle className="w-3.5 h-3.5" /></>
        )}
      </button>
    </>
  );
}

export default ChatBot;
