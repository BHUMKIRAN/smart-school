import TeachersPanelPage from "./teacher";
import { requireRole } from "@/lib/auth/requireRole";

const TeacherPage = async () => {
  await requireRole("teacher");
  return <TeachersPanelPage />;
};

export default TeacherPage;

