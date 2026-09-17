"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-2xl shadow-black/20"
    >
      <h1 className="text-4xl font-bold text-foreground">Taskora</h1>
      <p className="mt-2 text-muted">Project & Task Management</p>
      <p className="mt-1 text-sm text-muted">
        Plan projects, assign tasks, and track progress — all in one place.
      </p>

      <Link href="/login">
        <Button className="mt-6">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
}
