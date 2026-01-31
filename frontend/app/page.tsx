"use client";
import { motion } from "framer-motion";
import Hero3D from "@/components/Hero3D";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-screen grid grid-cols-2">
      <div className="flex flex-col justify-center p-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          Exclusive SaaS Benefits for Startups
        </motion.h1>
        <Link href="/deals" className="mt-6 text-indigo-600">
          Explore Deals →
        </Link>
      </div>
      <Hero3D />
    </section>
  );
}
