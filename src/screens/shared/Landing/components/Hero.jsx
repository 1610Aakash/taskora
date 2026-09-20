"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  ListChecks,
  Users,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-full max-w-7xl"
    >
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left Column: Copy & Actions */}
        <div className="max-w-2xl">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Project clarity, without the clutter
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl"
          >
            Make progress{" "}
            <span className="bg-linear-to-r from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent">
              visible.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg leading-8 text-muted md:text-xl"
          >
            Taskora gives teams a calm, shared workspace to plan projects,
            assign work, and finish with confidence.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link href="/login" className="group sm:w-48">
              <Button className="w-full transition-transform duration-200 group-hover:scale-[1.02]">
                Open workspace{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 px-1 text-sm text-muted">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>Access managed by your admin</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Hero Visuals & Dynamic Cards */}
        <motion.div
          variants={itemVariants}
          className="relative grid gap-4 sm:grid-cols-2"
        >
          {/* Decorative Backing Glow */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 -z-10 h-72 w-72 rounded-full bg-info/10 blur-3xl" />

          {/* Card 1: Projects in motion */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-xl shadow-black/20 backdrop-blur-md sm:translate-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                <FolderKanban className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <TrendingUp className="h-3 w-3" /> +12%
              </span>
            </div>
            <p className="mt-6 text-4xl font-bold tracking-tight text-foreground">
              24
            </p>
            <p className="mt-1 text-sm text-muted">Projects in motion</p>
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </motion.div>

          {/* Card 2: Completion Rate */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-xl shadow-black/20 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-info/10 p-2.5 text-info">
                <ListChecks className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-info">
                <Zap className="h-3.5 w-3.5" /> High velocity
              </span>
            </div>
            <p className="mt-6 text-4xl font-bold tracking-tight text-foreground">
              86%
            </p>
            <p className="mt-1 text-sm text-muted">Tasks completed</p>
            <div className="mt-5 flex gap-1.5">
              <span className="h-2 flex-1 rounded-full bg-info" />
              <span className="h-2 flex-1 rounded-full bg-info" />
              <span className="h-2 flex-1 rounded-full bg-info" />
              <span className="h-2 flex-1 rounded-full bg-border" />
            </div>
          </motion.div>

          {/* Card 3: Workspace Status Banner */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-border/80 bg-card/80 p-5 shadow-xl shadow-black/20 backdrop-blur-md sm:col-span-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="rounded-xl bg-success/15 p-2.5">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    A workspace that stays aligned
                  </p>
                  <p className="text-sm text-muted">
                    Everyone knows what matters next.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                On track
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
