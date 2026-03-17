import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import AdminDashboardPage from "./admin";

const AdminPage = async () => {

    const Requestcookies = await cookies();
    const token = Requestcookies.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    try {
        const decoded: any= jwt.verify(token, process.env.JWT_SECRET!);

        // Role check
        if (decoded.role !== "admin") {
            redirect("/login");
        } 
    } catch (error) {
        // redirect("/login");
    }

    // If everything is valid → render dashboard
    return <AdminDashboardPage />;
    }

export default AdminPage;