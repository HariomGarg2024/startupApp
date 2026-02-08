"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Deals() {
  const [deals, setDeals] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/deals")
      .then((res) => res.json())
      .then(setDeals)
      .catch((err) =>
        console.error("Error fetching deals:", err)
      );
  }, []);

  useEffect(() => {
    if (!successMessage) return;
    const t = setTimeout(() => setSuccessMessage(null), 5000);
    return () => clearTimeout(t);
  }, [successMessage]);

  useEffect(() => {
    if (!errorMessage) return;
    const t = setTimeout(() => setErrorMessage(null), 6000);
    return () => clearTimeout(t);
  }, [errorMessage]);

  const handleClaim = async (deal: any) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    if (deal.locked) {
      setErrorMessage("Authentication / verification required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Please login to claim this deal.");
      return;
    }

    setClaimingId(deal._id);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/claims/${deal._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const text = await res.text();

      if (!res.ok) {
        try {
          const data = JSON.parse(text);
          setErrorMessage(data.message || text || "Failed to claim deal");
        } catch {
          setErrorMessage(text || "Failed to claim deal");
        }
        return;
      }

      setSuccessMessage("You have successfully claimed this deal.");
    } catch (error: any) {
      console.error("Claim error:", error);
      setErrorMessage(error?.message || "An error occurred while claiming the deal.");
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="p-10">
      {successMessage && (
        <div
          className="mb-6 rounded-lg bg-green-900/50 border border-green-600 text-green-200 px-4 py-3"
          role="alert"
        >
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div
          className="mb-6 rounded-lg bg-red-900/50 border border-red-600 text-red-200 px-4 py-3"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.length === 0 ? (
        <p className="text-gray-400 col-span-full text-center">
          No deals available right now
        </p>
      ) : (
        deals.map((deal) => (
          <motion.div
            key={deal._id}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-xl shadow bg-zinc-900 border border-zinc-800 flex flex-col justify-between ${
              deal.locked ? "opacity-60" : ""
            }`}
          >
            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-white">
                  {deal.title}
                </h2>
                {deal.locked && <span>🔒</span>}
              </div>

              <p className="text-sm text-gray-400 mt-1">
                {deal.category}
              </p>

              {deal.locked && (
                <p className="mt-2 text-xs text-red-400 font-medium">
                  Verification required to unlock
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleClaim(deal)}
              disabled={deal.locked || claimingId === deal._id}
              className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors ${
                deal.locked
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                  : claimingId === deal._id
                    ? "bg-blue-700 text-blue-200 cursor-wait"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {deal.locked ? "Locked" : claimingId === deal._id ? "Claiming..." : "Claim Deal"}
            </button>
          </motion.div>
        ))
      )}
      </div>
    </div>
  );
}
