import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Lock, ShieldCheck, KeyRound, X, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, failedAttempts, lockoutUntil } = useAdmin();
  const [pin, setPin] = useState('');
  const [staffName, setStaffName] = useState('Erwin G. (Head Shaper)');
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const isCurrentlyLockedOut = Boolean(lockoutUntil && Date.now() < lockoutUntil);
  const remainingMins = lockoutUntil ? Math.ceil((lockoutUntil - Date.now()) / 60000) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCurrentlyLockedOut) return;

    setError(null);
    setLoading(true);
    const result = await login(pin, staffName);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setPin('');
    }
  };

  const handleQuickDemoPin = (code: string) => {
    setPin(code);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden transition-all text-white ${
          shake ? 'animate-shake ring-2 ring-rose-500' : ''
        }`}
      >
        {/* Subtle Carbon Pattern Background */}
        <div className="absolute inset-0 carbon-bg opacity-15 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-800 text-center relative z-10">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-sky-600 to-amber-500 p-0.5 shadow-lg shadow-sky-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-sky-400" />
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            Internal Staff Portal
          </span>

          <h2 className="mt-2 text-xl font-display font-black uppercase tracking-tight text-white">
            Saint Joe Shaping CMS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tacloban City Bay • Catalog &amp; GCash Order Management
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 relative z-10">
          <div>
            <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1.5 flex items-center justify-between">
              <span>Staff Name / Sign-In</span>
              <span className="text-slate-500 text-[10px]">Tacloban Workshop</span>
            </label>
            <input
              type="text"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="e.g. Erwin G. (Head Shaper)"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
              <label className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-sky-400" />
                <span>Security PIN Code</span>
              </label>
              <div className="flex items-center gap-2 text-[10px] font-mono text-sky-400">
                <span>Quick Fill:</span>
                <button
                  type="button"
                  onClick={() => handleQuickDemoPin('saintjoe2026')}
                  className="hover:text-sky-300 underline"
                >
                  saintjoe2026
                </button>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => handleQuickDemoPin('wolf2026')}
                  className="hover:text-amber-400 underline text-amber-300"
                >
                  wolf2026
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                disabled={isCurrentlyLockedOut}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder={isCurrentlyLockedOut ? `Locked for ${remainingMins}m` : 'Enter PIN code...'}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-center text-lg font-mono font-bold tracking-widest text-sky-400 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {isCurrentlyLockedOut ? (
              <div className="mt-2 text-xs font-mono text-rose-400 flex items-center gap-1.5 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/30">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Security Lockout: 5 failed attempts reached. Retry in {remainingMins} minute(s).</span>
              </div>
            ) : error ? (
              <div className="mt-2 text-xs font-mono text-rose-400 flex items-center gap-1.5 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            ) : failedAttempts > 0 ? (
              <p className="mt-1 text-[11px] font-mono text-amber-400">
                Warning: {failedAttempts} of 5 failed attempts logged.
              </p>
            ) : null}
          </div>

          {/* 12-Hour Session Notice */}
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong className="text-white">SHA-256 Hardened Auth:</strong> Zero-plaintext evaluation in JS bundles. Session persists for 12 hours. 100% S3 static hosting compatible.
            </div>
          </div>

          <button
            type="submit"
            disabled={isCurrentlyLockedOut || loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 group"
          >
            <span>{loading ? 'Evaluating SHA-256 Digest...' : 'Unlock Admin Panel'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer info */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-[10px] font-mono text-slate-500">
          Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Ctrl+Shift+A</kbd> or click the lock anytime to open.
        </div>
      </div>
    </div>
  );
};
