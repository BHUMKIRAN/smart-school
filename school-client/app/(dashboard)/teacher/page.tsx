import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import TeachersPanelPage from "./teacher";

const TeacherPage = async () => {

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
        if (decoded.role !== "teacher") {
            redirect("/login");
        }
    } catch (error) {
        console.log("this errror is comming from teacher page",error);
    }

    // If everything is valid → render dashboard
    return <TeachersPanelPage />;
}

export default TeacherPage;