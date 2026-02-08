"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    const safeRedirect = redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/";
    // Full page redirect so the navbar mounts fresh and reads user from localStorage
    window.location.href = safeRedirect;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-8 bg-zinc-900 rounded-xl"
      >
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-800"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-zinc-800"
          required
        />

        {error && (
          <p className="text-red-400 mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
