"use client";

import { motion } from "framer-motion";
import Hero3D from "@/components/Hero3D";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-screen grid grid-cols-1 lg:grid-cols-2">
    
      <div className="flex flex-col justify-center p-10 md:p-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold leading-tight"
        >
          Exclusive SaaS Benefits for Startups
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 mt-4 text-lg"
        >
          Discover and claim startup-only deals
        </motion.p>

     
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 mt-8"
        >
          <Link
            href="/login?redirect=/"
            className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-6 py-2 rounded border border-indigo-600 hover:bg-indigo-600 transition-colors"
          >
            Sign Up
          </Link>

          <Link
            href="/deals"
            className="px-6 py-2 rounded text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Explore Deals →
          </Link>
        </motion.div>
      </div>

     
      <div className="hidden lg:block relative">
        <Hero3D />
      </div>
    </section>
  );
}