// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout as libLogout } from "@/lib/auth";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
}

export default function useAuth(redirectToLogin = true) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
  const checkAuth = async () => {

    const storedUser = localStorage.getItem("smart-school-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data");
        localStorage.removeItem("smart-school-user");
        router.push("/login");
      }
    } else if (redirectToLogin) {
      router.push("/login");
    }

    setLoading(false);
  };

  checkAuth();
}, [router, redirectToLogin]);

  const logout = () => {
    libLogout();
    setUser(null);
    router.push("/login");
  };

  return { user, setUser, loading, logout };
}
