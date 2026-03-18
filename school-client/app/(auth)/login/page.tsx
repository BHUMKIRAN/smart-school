'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { credentials } from '@/store/authSlice';
import { login } from '@/Backend/auth';
import { toast } from 'sonner';
import Logo from '@/components/shared/logo';
import { setCookie } from 'nookies';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const roleParam = searchParams.get('role')?.toLowerCase() as 'student' | 'teacher' | 'admin' | undefined;

  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>(roleParam || 'student');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (roleParam && roleParam !== role) {
      setRole(roleParam);
    }
  }, [roleParam]);

  const handleRoleChange = (nextRole: 'student' | 'teacher' | 'admin') => {
    setRole(nextRole);
    router.replace(`/login?role=${nextRole}`);
  };

  const roles = [
    { id: 'student', name: 'विद्यार्थी', icon: <GraduationCap size={18} /> },
    { id: 'teacher', name: 'शिक्षक', icon: <Users size={18} /> },
    { id: 'admin', name: 'प्रशासक', icon: <ShieldCheck size={18} /> },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await login({ email, password, role });
      if (!data?.user || !data?.token) throw new Error('Invalid login response');

      dispatch(credentials({ user: data.user, token: data.token }));
      setCookie(null, 'token', data.token, { maxAge: 7 * 24 * 60 * 60, path: '/' });
      toast.success(`स्वागत छ, ${data.user.name}!`);

      const nextPath = role === 'admin' ? '/admin' : role === 'teacher' ? '/teacher' : '/student';
      router.push(nextPath);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'लगइन असफल भयो।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] animate-fadeIn">
        
        <div className="card overflow-hidden border-none shadow-xl">
          {/* Top Header Section with Logo */}
          <header className="bg-primary-dark py-1 flex flex-col items-center justify-center text-white">
            <div className=" p-2  mb-3 ">
               <Logo />
            </div>
           
          </header>

          <div className="p-6 md:p-8">
            {/* Role Switcher */}
            <div className="flex bg-[var(--muted-bg)] p-1 rounded-lg mb-6 border border-[var(--card-border)]">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleChange(r.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all text-xs font-bold nepali-text ${
                    role === r.id
                      ? 'bg-[var(--card-bg)] text-[var(--primary)] shadow-sm border border-[var(--card-border)]'
                      : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {r.icon}
                  <span className="hidden sm:inline">{r.name}</span>
                </button>
              ))}
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Input Group */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[var(--muted-text)] uppercase tracking-wider ml-1">
                  Email / Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-text)]" size={16} />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@school.com"
                    className="dash-input w-full pl-10 text-sm py-2.5 rounded-lg"
                  />
                </div>
              </div>

              {/* Password Group */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-[var(--muted-text)] uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => router.push('/forget-password')}
                    className="text-[10px] font-bold text-[var(--primary)] hover:underline nepali-text"
                  >
                    बिर्सनुभयो?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-text)]" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="dash-input w-full pl-10 pr-10 text-sm py-2.5 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-text)] hover:text-[var(--primary)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <span className="nepali-text">लगइन गर्नुहोस्</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        <p className="text-center mt-6 text-[var(--muted-text)] text-[11px] font-medium opacity-60">
          &copy; {new Date().getFullYear()} School Management System
        </p>
      </div>
    </div>
  );
}