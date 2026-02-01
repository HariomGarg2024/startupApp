"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="flex justify-between items-center p-6 border-b border-zinc-800">
      <Link href="/" className="text-xl font-bold">
        StartupBenefits
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-400">
              Hi, <span className="text-white">{user.name}</span>
            </span>

            <Link
              href="/dashboard"
              className="hover:text-indigo-400"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="px-4 py-1 rounded bg-red-600 hover:bg-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-indigo-400">
              Login
            </Link>
            <Link href="/signup" className="hover:text-indigo-400">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
