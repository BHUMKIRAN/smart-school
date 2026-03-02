
import { useRouter } from "next/navigation";

const Logout = ({ onClose }) => {
  const router = useRouter();

  const handleConfirm = () => {
    localStorage.clear(); // clear storage
    router.push("/login"); // redirect to login page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999] backdrop-blur-sm animate-fadeIn">
      {/* Used .modal-content for global styling and .dash-card for the surface */}
      <div className="modal-content text-center max-w-sm">
        
        <h2 className="text-xl font-bold mb-2">
          Confirm Logout
        </h2>

        <p className="text-[var(--muted-text)] mb-8">
          Are you sure you want to end your session?
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          {/* Secondary Action */}
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-[var(--dash-border)] text-[var(--muted-text)] hover:bg-[var(--dash-sidebar-hover)] transition-all order-2 sm:order-1"
          >
            Cancel
          </button>

          {/* Primary Brand Action */}
          <button
            onClick={handleConfirm}
            className="btn-primary px-6 py-2 order-1 sm:order-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;