"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "teacher" | "student">("student");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register({ name, email, password, role });
      setMessage("Registration successful! Redirecting to login...");
      setError("");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err: any) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/30">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-white/30 p-4 rounded-full">
            <UserPlus className="text-white" size={32} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Smart School Register
        </h1>

        {error && (
          <p className="text-red-200 bg-red-500/20 p-2 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        {message && (
          <p className="text-green-200 bg-green-500/20 p-2 rounded mb-4 text-sm text-center">
            {message}
          </p>
        )}

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

    

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full py-3 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-indigo-100 transition-all duration-300 shadow-lg hover:scale-105"
        >
          Create Account
        </button>

        {/* Footer */}
        <p className="text-white text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="underline cursor-pointer hover:text-gray-200"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
