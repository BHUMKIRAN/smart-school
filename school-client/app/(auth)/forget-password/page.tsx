'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/shared/logo';
import { api } from '@/Backend/axiosClientInstance';

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    role: '',
  });

  const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null) {
      const maybe = error as { response?: { data?: { message?: string } }; message?: string };
      return maybe.response?.data?.message || maybe.message || 'केही समस्या आयो। कृपया पुनः प्रयास गर्नुहोस्।';
    }
    return 'केही समस्या आयो। कृपया पुनः प्रयास गर्नुहोस्।';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForget = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.role) return alert('कृपया भूमिका छान्नुहोस्');

    setLoading(true);
    try {
      await api.post(`/forget`, data);
      setEmailSent(true);
    } catch (error: unknown) {
      console.error('Error sending reset link:', error);
      alert(getErrorMessage(error));
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
            <h2 className="text-xl text-accent font-bold nepali-text tracking-tight">
              {emailSent ? 'इमेल पठाइयो!' : 'पासवर्ड बिर्सनुभयो?'}
            </h2>
          </header>

          <div className="p-6 md:p-8">
            {!emailSent ? (
              <>
                <div className="text-center mb-6">
                  <p className="text-[var(--muted-text)] text-xs font-medium leading-relaxed nepali-text">
                    तपाईंको रजिस्टर गरिएको इमेल भर्नुहोस्, हामी रिसेट लिङ्क पठाउनेछौं।
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleForget}>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[var(--muted-text)] uppercase tracking-wider ml-1">
                      इमेल ठेगाना
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-text)]" size={16} />
                      <input
                        type="email"
                        name="email"
                        required
                        value={data.email}
                        onChange={handleChange}
                        placeholder="example@school.com"
                        className="dash-input w-full pl-10 text-sm py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[var(--muted-text)] uppercase tracking-wider ml-1">
                      भूमिका छान्नुहोस्
                    </label>
                    <select
                      name="role"
                      id="role"
                      required
                      value={data.role}
                      onChange={handleChange}
                      className="dash-input w-full text-sm py-2.5 px-3 rounded-lg border border-gray-200 outline-none focus:border-primary appearance-none bg-white"
                    >
                      <option value="" disabled>
                        भूमिका छान्नुहोस्
                      </option>
                      <option value="student">विद्यार्थी</option>
                      <option value="teacher">शिक्षक</option>
                      <option value="admin">एडमिन</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2 group bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    <span className="nepali-text">{loading ? 'पठाउँदै...' : 'लिङ्क पठाउनुहोस्'}</span>
                    {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-2 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-[var(--muted-text)] text-xs font-medium leading-relaxed nepali-text">
                  हामीले पासवर्ड रिसेट गर्ने निर्देशन तपाईंको इमेलमा पठाएका छौं। कृपया इनबक्स/स्प्याम जाँच गर्नुहोस्।
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setEmailSent(false)}
                    className="text-[11px] font-bold text-blue-600 hover:underline nepali-text"
                  >
                    इमेल प्राप्त भएन? पुनः पठाउनुहोस्
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-bold uppercase tracking-wider nepali-text">लगइन पेजमा फर्कनुहोस्</span>
        </Link>

        <p className="text-center mt-8 text-gray-400 text-[11px] font-medium opacity-60">
          &copy; {new Date().getFullYear()} School Management System
        </p>
      </div>
    </div>
  );
}
