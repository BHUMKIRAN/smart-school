import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

export type UserRole = "admin" | "teacher" | "student";

const roleHome: Record<UserRole, string> = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
};

export async function requireRole(expectedRole: UserRole) {
 

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) {
    
    redirect("/login");
  }

  const secret = process.env.JWT_SECRET;



  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  let payload: JwtPayload & { role?: UserRole };

  try {
    payload = jwt.verify(token!, secret) as JwtPayload & { role?: UserRole };
    
  } catch (err) {
    
    redirect("/login");
  }

  const actualRole = payload.role;



  if (!actualRole) {
   
    redirect("/login");
  }

  if (actualRole !== expectedRole) {
   

    redirect(roleHome[actualRole]);
  }


  return payload;
}