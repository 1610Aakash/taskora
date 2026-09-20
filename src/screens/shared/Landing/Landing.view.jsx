"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "./components/Hero";
import {
  ArrowUpRight,
  Gauge,
  ShieldCheck,
  Sparkles,
  Layers,
  Zap,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const featureCards = [
  {
    icon: Sparkles,
    title: "One clear workspace",
    description:
      "Projects, tasks, people, and progress in one calm command center.",
    badge: "Unified",
  },
  {
    icon: Gauge,
    title: "Momentum at a glance",
    description:
      "See what is moving, what needs attention, and what is already done.",
    badge: "Real-time",
  },
  {
    icon: ShieldCheck,
    title: "Built for focus",
    description:
      "Simple permissions and thoughtful defaults keep teams aligned.",
    badge: "Secure",
  },
];

export default function LandingView() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <main className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden bg-background px-5 py-16 md:px-10">
        <Hero />
      </main>

      {/* Features & Metrics Section */}
      <section className="relative border-t border-border/70 bg-card/30 px-5 py-24 backdrop-blur-sm md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Feature Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map(
              ({ icon: Icon, title, description, badge }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-border/80 bg-card p-7 shadow-lg shadow-black/5 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted">
                      {badge}
                    </span>
                  </div>
                  <h2 className="mt-8 text-xl font-semibold text-foreground">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                </motion.div>
              ),
            )}
          </div>

          {/* Lower Banner / Metrics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 grid items-center gap-8 rounded-3xl border border-border/80 bg-card/60 p-8 md:grid-cols-[1fr_auto] md:p-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Activity className="h-3.5 w-3.5" />
                The workday, clarified
              </div>
              <p className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Less hunting. More meaningful progress.
              </p>
            </div>

            <div className="flex items-center gap-10 rounded-2xl border border-border/50 bg-background/50 px-8 py-6 backdrop-blur-sm">
              <div>
                <p className="text-4xl font-extrabold text-foreground">3×</p>
                <p className="mt-1 text-xs font-medium text-muted">
                  faster handoffs
                </p>
              </div>
              <div className="h-10 w-px bg-border/80" />
              <div>
                <p className="text-4xl font-extrabold text-foreground">1</p>
                <p className="mt-1 text-xs font-medium text-muted">
                  shared source of truth
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/70 bg-background px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Taskora</span>
          <Link
            href="/login"
            className="group inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary"
          >
            Enter your workspace
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </footer>
    </>
  );
}
