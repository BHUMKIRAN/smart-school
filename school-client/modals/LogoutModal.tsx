'use client';

import { useRouter } from "next/navigation";
import { LogOut, AlertTriangle, X } from "lucide-react";

type LogoutProps = {
  onClose: () => void;
};

const Logout = ({ onClose }: LogoutProps) => {
  const router = useRouter();

  const handleConfirm = () => {
    localStorage.clear(); // clear storage
    router.push("/login"); // redirect to login page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999] backdrop-blur-sm animate-fadeIn p-4">
      {/* Container uses your .modal-content and .dash-card logic */}
      <div className="dash-card modal-content max-w-sm w-full overflow-hidden relative shadow-2xl border-[var(--dash-border)]">
        
        {/* CLOSE ICON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[var(--muted-bg)] text-[var(--dash-text-muted)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* WARNING ICON BOX */}
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 mt-2">
            <AlertTriangle className="w-8 h-8 text-[var(--error)]" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-[var(--dash-text)] mb-2">
            Confirm Logout
          </h2>

          <p className="text-[var(--dash-text-muted)] text-sm px-4 leading-relaxed">
            Are you sure you want to end your session? You will need to sign back in to access your faculty dashboard.
          </p>

          {/* ACTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-10">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-[var(--dash-border)] font-bold text-[var(--dash-text)] hover:bg-[var(--dash-sidebar-hover)] transition-all order-2 sm:order-1"
            >
              Stay Logged In
            </button>

            <button
              onClick={handleConfirm}
              className="btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold order-1 sm:order-2 shadow-lg shadow-blue-500/20"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;