import StudentDashboardPage from "./student";
import { requireRole } from "@/lib/auth/requireRole";

const StudentPage = async () => {
  await requireRole("student");
  return <StudentDashboardPage />;
};

export default StudentPage;

