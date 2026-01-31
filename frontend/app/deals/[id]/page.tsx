"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DealDetails() {
  const { id } = useParams();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/deals/${id}`)
      .then(res => res.json())
      .then(data => {
        setDeal(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="p-10 text-gray-400">Loading deal...</p>;
  }

  if (!deal) {
    return <p className="p-10 text-red-400">Deal not found</p>;
  }

  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-4xl font-bold">{deal.title}</h1>

      <p className="mt-4 text-gray-400">
        Partner: {deal.partner}
      </p>

      <p className="mt-6">{deal.description}</p>

      <p className="mt-4 text-sm text-gray-400">
        Eligibility: {deal.eligibility}
      </p>

      {deal.locked && (
        <p className="mt-6 text-red-400">
          🔒 Verification required to claim this deal
        </p>
      )}
    </div>
  );
}
