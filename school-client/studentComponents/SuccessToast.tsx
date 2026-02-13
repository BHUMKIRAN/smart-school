interface SuccessToastProps {
  isVisible: boolean;
  message: string;
}

export default function SuccessToast({ isVisible, message }: SuccessToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className="glass-card rounded-xl p-4 border border-green-500/30 flex items-center gap-3 shadow-2xl">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div>
          <p className="font-semibold text-slate-100 text-sm">Success!</p>
          <p className="text-xs text-slate-400">{message}</p>
        </div>
      </div>
    </div>
  );
}
