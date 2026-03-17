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

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const roleParam = searchParams.get('role')?.toLowerCase() as
    | 'student'
    | 'teacher'
    | 'admin'
    | undefined;

  // Initialize role from query param
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>(roleParam || 'student');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update role if query param changes
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
    { id: 'student', name: 'विद्यार्थी', icon: <GraduationCap size={20} /> },
    { id: 'teacher', name: 'शिक्षक', icon: <Users size={20} /> },
    { id: 'admin', name: 'प्रशासक', icon: <ShieldCheck size={20} /> },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login({ email, password, role });
      if (!data?.user || !data?.token) {
        throw new Error('Invalid login response');
      }
      dispatch(credentials({ user: data.user, token: data.token }));
      toast.success(`स्वागत छ, ${data.user.name}!`);

      const nextPath =
        role === 'admin' ? '/admin' : role === 'teacher' ? '/teacher' : '/student';
      router.push(nextPath);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'लगइन असफल भयो। विवरण जाँच गर्नुहोस्।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-[450px] space-y-8">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-500/5">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white nepali-text">
              स्वागत छ!
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              अगाडि बढ्न आफ्नो विवरण भर्नुहोस्
            </p>
          </div>

          {/* Role Switcher */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl mb-8">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleChange(r.id as any)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all duration-300 ${role === r.id
                    ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 scale-100'
                    : 'text-slate-400 hover:text-slate-600 opacity-60 scale-95'
                  }`}
              >
                {r.icon}
                <span className="text-[10px] font-black nepali-text uppercase">{r.name}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">
                Email / Username
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@school.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Password
                </label>
                <button type="button" onClick={() => router.push('/forget-password')} className="text-[11px] font-bold text-blue-600 hover:underline">
                  बिर्सनुभयो?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span className="nepali-text text-base">लगइन गर्नुहोस्</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
