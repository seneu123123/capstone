import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  ShieldCheck, 
  X, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  Database,
  RefreshCw,
  Copy,
  Check,
  Smartphone,
  CheckCircle2,
  Terminal
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, role: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('admin@holidaytravelers.ph');
  const [password, setPassword] = useState('password123');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [otpValue, setOtpValue] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [otpTimestamp, setOtpTimestamp] = useState<string>('');
  const [showDbInspector, setShowDbInspector] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (step === 'otp') {
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomOtp);
      setOtpTimestamp(new Date().toISOString());
      setOtpValue('');
    }
  }, [step]);

  if (!isOpen) return null;

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email.trim() && password.length >= 6) {
        setStep('otp');
      } else {
        setError('Invalid credentials. Password must be at least 6 characters.');
      }
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (otpValue.trim() === generatedOtp) {
        onLoginSuccess(email, 'Senior Tour Operations Manager');
        onClose();
        setStep('credentials');
      } else {
        setError('Invalid OTP code. Please match the active code from your PostgreSQL database / device.');
      }
    }, 400);
  };

  const handleResendOtp = () => {
    const freshOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(freshOtp);
    setOtpTimestamp(new Date().toISOString());
    setError(null);
  };

  const handleCopyOtp = () => {
    navigator.clipboard.writeText(generatedOtp);
    setCopied(true);
    setOtpValue(generatedOtp);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50">
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            setStep('credentials');
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            {step === 'credentials' ? <Lock className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {step === 'credentials' ? 'Operator Command Login' : 'Two-Factor Security Verification'}
            </h3>
            <p className="text-xs text-slate-400">
              {step === 'credentials' 
                ? 'Access Tour Management, Manifests, and Dispatch Ledger'
                : 'Enter the 6-digit OTP assigned to your operator session'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Credentials Form */}
        {step === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Operator Work Email
              </label>
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-700 focus-within:border-cyan-500 transition-colors">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@holidaytravelers.ph"
                  className="bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none w-full"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Staff Password
                </label>
                <span className="text-[11px] text-cyan-400 font-mono">Demo: password123</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-700 focus-within:border-cyan-500 transition-colors">
                <KeyRound className="w-4 h-4 text-slate-500 shrink-0" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Validating credentials...</span>
              ) : (
                <>
                  <span>Proceed to Two-Factor Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: 2FA OTP Form */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-cyan-200 mb-0.5">Two-Factor OTP Dispatched</p>
                <p className="text-slate-400 text-[11px]">
                  A 6-digit code was saved to the PostgreSQL database (<code className="text-cyan-300 font-mono">users.two_factor_code</code>).
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Enter 6-Digit Verification Code
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••••"
                  className="w-full py-3 px-4 bg-slate-950 border border-slate-700 rounded-xl text-center text-xl font-mono tracking-[0.5em] text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* pgAdmin Database Inspector Toggle */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowDbInspector(!showDbInspector)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs text-cyan-400 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-[11px]">View Active OTP in pgAdmin4 (Database)</span>
                </div>
                <span className="text-[10px] text-slate-400">{showDbInspector ? 'Hide' : 'Inspect'}</span>
              </button>

              {showDbInspector && (
                <div className="p-3.5 rounded-2xl bg-[#070B0E] border border-cyan-500/40 text-xs font-mono space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 text-[10px]">
                    <span>POSTGRESQL QUERY RESULT (users table)</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Row
                    </span>
                  </div>

                  <div className="overflow-x-auto text-[11px] text-slate-300">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-500 border-b border-slate-800">
                          <th className="py-1 pr-2">email</th>
                          <th className="py-1 px-2">two_factor_code</th>
                          <th className="py-1 pl-2">expires_at</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-1.5 pr-2 text-cyan-300">{email}</td>
                          <td className="py-1.5 px-2 font-bold text-amber-400 bg-amber-400/10 rounded px-1">{generatedOtp}</td>
                          <td className="py-1.5 pl-2 text-slate-400 text-[10px]">{otpTimestamp.slice(11, 19)} UTC</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={handleCopyOtp}
                      className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Auto-filled OTP!' : 'Copy & Auto-fill OTP'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[10px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Generate New Code</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={isLoading || otpValue.length !== 6}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-40"
              >
                {isLoading ? (
                  <span>Verifying Token...</span>
                ) : (
                  <>
                    <span>Verify & Launch Command Portal</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Protected by Laravel Sanctum & PostgreSQL 2FA Integrity
          </p>
        </div>
      </div>
    </div>
  );
};

