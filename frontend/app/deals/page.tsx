  "use client";
  import { useEffect, useState } from "react";
  import { motion } from "framer-motion";

  export default function Deals() {
    const [deals, setDeals] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:5000/api/deals")
        .then(res => res.json())
        .then(setDeals);
    }, []);

    return (
  <div className="p-10 grid grid-cols-3 gap-6">
    {deals.length === 0 ? (
      <p className="text-gray-400 col-span-3 text-center">
        No deals available right now
      </p>
    ) : (
      deals.map((deal: any) => (
        <motion.div
          key={deal._id}
          whileHover={{ scale: 1.05 }}
          className={`p-6 rounded-xl shadow bg-zinc-900 ${
            deal.locked ? "opacity-50" : ""
          }`}
        >
          <h2 className="text-xl font-semibold">{deal.title}</h2>
          <p className="text-sm text-gray-400">{deal.category}</p>

          {deal.locked && (
            <p className="mt-2 text-red-400">
              🔒 Verification required
            </p>
          )}
        </motion.div>
      ))
    )}
  </div>
);

  }
