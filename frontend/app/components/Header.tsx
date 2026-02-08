"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    syncUser();
    window.addEventListener("auth-change", syncUser);
    return () => window.removeEventListener("auth-change", syncUser);
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
            <span className="text-zinc-400 text-sm sm:text-base" aria-label="Logged in as">
              <span className="text-zinc-500 mr-1">Welcome,</span>
              <span className="text-white font-semibold">{user.name || user.email || "User"}</span>
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
            <Link href={`/login?redirect=${encodeURIComponent(pathname || "/")}`} className="hover:text-indigo-400">
              Login
            </Link>
            <Link href={`/signup?redirect=${encodeURIComponent(pathname || "/")}`} className="hover:text-indigo-400">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
