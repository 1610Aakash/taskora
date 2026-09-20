"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "./components/Hero";
import { ArrowUpRight, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingView() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden bg-background px-5 py-14 md:px-10">
        <Hero />
      </main>
      <section className="border-t border-border/70 bg-card/35 px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [Sparkles, "One clear workspace", "Projects, tasks, people, and progress in one calm command center."],
              [Gauge, "Momentum at a glance", "See what is moving, what needs attention, and what is already done."],
              [ShieldCheck, "Built for focus", "Simple permissions and thoughtful defaults keep teams aligned."],
            ].map(([Icon, title, description], index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: index * 0.08 }} className="interactive-surface rounded-2xl border border-border bg-card p-6">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="mt-8 text-lg font-semibold text-foreground">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 grid items-end gap-8 border-t border-border pt-10 md:grid-cols-[1fr_auto]">
            <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">The workday, clarified</p><p className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Less hunting. More meaningful progress.</p></div>
            <div className="flex gap-8 text-right"><div><p className="text-3xl font-semibold text-foreground">3×</p><p className="mt-1 text-xs text-muted">faster handoffs</p></div><div><p className="text-3xl font-semibold text-foreground">1</p><p className="mt-1 text-xs text-muted">shared source of truth</p></div></div>
          </div>
        </div>
      </section>
      <footer className="border-t border-border/70 px-5 py-8 md:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Taskora</span><Link href="/login" className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-primary">Enter your workspace <ArrowUpRight className="h-4 w-4" /></Link></div></footer>
    </>
  );
}
