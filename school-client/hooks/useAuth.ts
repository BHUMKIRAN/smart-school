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
    const storedUser = localStorage.getItem("smart-school-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (redirectToLogin) {
      router.push("/login");
    }
    setLoading(false);
  }, []);

  const logout = () => {
    libLogout();
    setUser(null);
    router.push("/login");
  };

  return { user, setUser, loading, logout };
}
