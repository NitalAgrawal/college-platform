"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-teal-700 px-6 py-4 flex justify-between items-center shadow-lg">
      <Link href="/" className="text-2xl font-bold text-white tracking-tight">
        🎓 CollegeFinder
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/" className="text-teal-100 hover:text-white transition">
          Colleges
        </Link>
        {user ? (
          <>
            <Link href="/saved" className="text-teal-100 hover:text-white transition">
              Saved
            </Link>
            <span className="text-teal-200 text-sm">Hi, {user.name} 👋</span>
            <button
              onClick={logout}
              className="bg-white text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-50 font-semibold text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-teal-100 hover:text-white transition">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-50 font-semibold text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}