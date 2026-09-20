"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, FolderKanban, ListChecks, Users } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative mx-auto w-full max-w-7xl"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-primary">Project clarity, without the clutter</p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl">Make progress visible.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted md:text-xl">Taskora gives teams a calm, shared workspace to plan projects, assign work, and finish with confidence.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="sm:w-44"><Button>Open workspace <ArrowRight className="h-4 w-4" /></Button></Link>
            <div className="flex items-center gap-2 px-1 text-sm text-muted"><CheckCircle2 className="h-4 w-4 text-success" /> Access managed by your admin</div>
          </div>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/20 sm:translate-y-8">
            <FolderKanban className="h-6 w-6 text-primary" />
            <p className="mt-8 text-3xl font-bold text-foreground">24</p>
            <p className="mt-1 text-sm text-muted">Projects in motion</p>
            <div className="mt-5 h-2 rounded-full bg-background"><div className="h-full w-3/4 rounded-full bg-primary" /></div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/20">
            <ListChecks className="h-6 w-6 text-info" />
            <p className="mt-8 text-3xl font-bold text-foreground">86%</p>
            <p className="mt-1 text-sm text-muted">Tasks completed</p>
            <div className="mt-5 flex gap-1"><span className="h-2 flex-1 rounded-full bg-info" /><span className="h-2 flex-1 rounded-full bg-info" /><span className="h-2 flex-1 rounded-full bg-info" /><span className="h-2 flex-1 rounded-full bg-border" /></div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/20 sm:col-span-2">
            <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="rounded-lg bg-success/15 p-2"><Users className="h-5 w-5 text-success" /></div><div><p className="font-semibold text-foreground">A workspace that stays aligned</p><p className="text-sm text-muted">Everyone knows what matters next.</p></div></div><span className="text-sm font-medium text-success">On track</span></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
