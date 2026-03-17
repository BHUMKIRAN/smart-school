import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import StudentDashboardPage from "./student";

const StudentPage = async () => {

    const Requestcookies = await cookies();
    const token = Requestcookies.get("token")?.value;

    if (!token) {
        redirect("/login");
    }
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT secret is not defined");
    }

    try {
        const decoded: any= jwt.verify(token, secret);

        // Role check
        if (decoded.role !== "student") {
            redirect("/login");
        }
    } catch (error) {
        console.log("this errror is comming from student page",error);
    }

    // If everything is valid → render dashboard
    return <StudentDashboardPage />;
}

export default StudentPage;