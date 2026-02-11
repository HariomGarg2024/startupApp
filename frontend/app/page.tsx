"use client";

import { motion } from "framer-motion";
import Hero3D from "@/components/Hero3D";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="noise-overlay" />

      <section className="relative grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-[1.1fr_minmax(0,1fr)] gap-10 px-6 pb-16 pt-10 md:px-14 md:pt-16 lg:px-20">
        <div className="flex flex-col justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 text-xs font-medium text-cyan-300 mb-4 w-fit"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            Startup SaaS Perks, reimagined
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50"
          >
            Unlock{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              premium SaaS deals
            </span>{" "}
            for your next big thing.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mt-4 max-w-xl text-sm md:text-base text-slate-300/90"
          >
            Curated benefits from world‑class tools: infra, analytics, design,
            and more — all tailored for early‑stage founders ready to move fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/signup"
              className="glow-button inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-medium text-slate-950 shadow-[0_18px_40px_rgba(8,47,73,0.75)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get early access</span>
            </Link>

            <Link
              href="/deals"
              className="inline-flex items-center justify-center rounded-full border border-slate-600/70 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-100/90 backdrop-blur-md hover:border-cyan-400/60 hover:text-cyan-200 transition-colors"
            >
              Explore deals →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.35 }}
            className="mt-8 grid max-w-xl grid-cols-2 gap-4 text-xs text-slate-400"
          >
            <div className="glass-panel p-3">
              <p className="font-semibold text-slate-100 mb-1">
                Startup‑first curation
              </p>
              <p>We hand‑select tools founders actually ship with.</p>
            </div>
            <div className="glass-panel p-3">
              <p className="font-semibold text-slate-100 mb-1">
                Save months of burn
              </p>
              <p>Reduce SaaS costs while keeping your stack world‑class.</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-10 bg-gradient-to-br from-cyan-500/20 via-sky-400/10 to-indigo-500/10 blur-3xl" />
          <div className="relative h-full w-full glass-panel overflow-hidden">
            <Hero3D />
          </div>
        </motion.div>
      </section>
    </main>
  );
}