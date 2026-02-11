"use client";
import { useEffect, useState } from "react";
import { fetchClaims } from "@/lib/api";

type DashboardUser = {
  id: string;
  name: string;
  email: string;
};

type DashboardDeal = {
  _id: string;
  title: string;
  category?: string;
};

type DashboardClaim = {
  _id: string;
  status: string;
  createdAt?: string;
  deal?: DashboardDeal;
};

const getStatusClasses = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized === "approved") {
    return "bg-green-900/60 text-green-300 border-green-700";
  }
  if (normalized === "pending") {
    return "bg-amber-900/60 text-amber-300 border-amber-700";
  }
  if (normalized === "rejected") {
    return "bg-red-900/60 text-red-300 border-red-700";
  }
  return "bg-blue-900/60 text-blue-300 border-blue-700";
};

export default function Dashboard() {
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [claims, setClaims] = useState<DashboardClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      setError("Please login to view your dashboard.");
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(storedUser) as DashboardUser;
      setUser(parsed);
    } catch {
      // ignore parse errors.
    }

    setLoading(true);
    fetchClaims(token)
      .then((data) => {
        setClaims(data as DashboardClaim[]);
      })
      .catch((err: any) => {
        console.error("Failed to load claims", err);
        setError(err?.message || "Failed to load claimed deals.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-3xl font-semibold text-white">User Dashboard</h1>

      {error && (
        <div className="rounded-lg bg-red-900/50 border border-red-600 text-red-200 px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 rounded-xl bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-lg font-medium text-white mb-4">Profile</h2>
          {user ? (
            <div className="space-y-2 text-sm text-zinc-200">
              <p>
                <span className="text-zinc-400">Name:</span>{" "}
                <span className="font-medium">{user.name}</span>
              </p>
              <p>
                <span className="text-zinc-400">Email:</span>{" "}
                <span className="font-medium">{user.email}</span>
              </p>
              <p className="break-all">
                <span className="text-zinc-400">User ID:</span>{" "}
                <span className="font-mono text-xs">{user.id}</span>
              </p>
            </div>
          ) : (
            <p className="text-sm text-zinc-400">
              We couldn&apos;t load your profile. Please log in again.
            </p>
          )}
        </div>

        <div className="md:col-span-2 rounded-xl bg-zinc-900 border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Claimed Deals</h2>
          </div>

          {loading ? (
            <p className="text-sm text-zinc-400">Loading your claimed deals...</p>
          ) : claims.length === 0 ? (
            <p className="text-sm text-zinc-400">
              You haven&apos;t claimed any deals yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400">
                    <th className="text-left py-2 pr-4 font-medium">Deal</th>
                    <th className="text-left py-2 pr-4 font-medium">Category</th>
                    <th className="text-left py-2 pr-4 font-medium">Claimed At</th>
                    <th className="text-left py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((claim) => (
                    <tr
                      key={claim._id}
                      className="border-b border-zinc-800 last:border-0"
                    >
                      <td className="py-2 pr-4 text-zinc-200">
                        {claim.deal?.title || "Unknown deal"}
                      </td>
                      <td className="py-2 pr-4 text-zinc-400">
                        {claim.deal?.category || "—"}
                      </td>
                      <td className="py-2 pr-4 text-zinc-400">
                        {claim.createdAt
                          ? new Date(claim.createdAt).toLocaleString()
                          : "—"}
                      </td>
                      <td className="py-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusClasses(
                            claim.status || "claimed"
                          )}`}
                        >
                          {claim.status || "claimed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
