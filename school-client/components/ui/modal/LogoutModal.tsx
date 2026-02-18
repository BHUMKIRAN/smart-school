import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Logout = ({ onClose }) => {

 const router = useRouter();
  const handleConfirm = () => {
    logout();              // clear storage
    router.push("/login");    // redirect to login page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]  ">
      <div className="w-80 bg-white rounded-2xl shadow-xl p-6 text-center space-y-4">

        <h1 className="text-2xl font-bold text-red-500">
          Logout
        </h1>

        <p className="text-gray-600">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
