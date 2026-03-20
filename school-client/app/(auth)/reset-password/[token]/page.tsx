'use client';

import { useState, FormEvent } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { KeyRound, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Logo from '@/components/shared/logo';
import { api } from '@/Backend/axiosClientInstance';

export default function ResetPassword() {
  const params = useParams();
  const tokenParam = (params as { token?: string | string[] })?.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const getErrorMessage = (err: unknown): string => {
    if (typeof err === 'object' && err !== null) {
      const maybe = err as { response?: { data?: { message?: string } }; message?: string };
      return maybe.response?.data?.message || maybe.message || 'लिङ्क अमान्य छ वा म्याद सकिएको छ।';
    }
    return 'लिङ्क अमान्य छ वा म्याद सकिएको छ।';
  };

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!token) return setError('रिसेट टोकन URL मा छैन।');
    if (!role) return setError('भूमिका (role) URL मा छैन।');

    if (password !== confirmPassword) return setError('पासवर्डहरू मिलेनन्।');
    if (password.length < 6) return setError('पासवर्ड कम्तिमा ६ अक्षरको हुनुपर्छ।');

    setLoading(true);
    try {
      await api.put(`/reset/${token}?role=${encodeURIComponent(role)}`, { password });
      setIsSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] animate-fadeIn">
        <div className="card overflow-hidden border-none shadow-xl mb-6 bg-white rounded-2xl">
          <header className="bg-primary-dark py-6 flex flex-col items-center justify-center text-white text-center">
            <div className="p-2 rounded-xl mb-3">
              <Logo />
            </div>
            <h2 className="text-xl text-accent font-bold nepali-text tracking-tight">नयाँ पासवर्ड सेट गर्नुहोस्</h2>
          </header>

          <div className="p-6 md:p-8">
            {!isSuccess ? (
              <form className="space-y-4" onSubmit={handleReset}>
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs flex items-center gap-2 border border-red-100">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                    नयाँ पासवर्ड
                  </label>
                  <div className="relative group">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="dash-input w-full pl-10 pr-10 text-sm py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                    पासवर्ड पुष्टि गर्नुहोस्
                  </label>
                  <div className="relative group">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="dash-input w-full pl-10 text-sm py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2 group bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  <span className="nepali-text">{loading ? 'प्रक्रिया हुँदैछ...' : 'पासवर्ड परिवर्तन गर्नुहोस्'}</span>
                  {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            ) : (
              <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">सफलता!</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  तपाईंको पासवर्ड सफलतापूर्वक परिवर्तन भयो। तपाईंलाई लगइन पृष्ठमा लैजाँदैछ...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
