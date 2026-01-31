"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/claims", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(setClaims);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">My Claims</h1>
      {claims.map((c: any) => (
        <div key={c._id}>
          {c.deal.title} – {c.status}
        </div>
      ))}
    </div>
  );
}
