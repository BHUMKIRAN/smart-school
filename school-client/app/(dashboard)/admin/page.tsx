import AdminDashboardPage from "./admin";
import { requireRole } from "@/lib/auth/requireRole";

const AdminPage = async () => {
  await requireRole("admin");
  return <AdminDashboardPage />;
};

export default AdminPage;

