"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function SectionLayout({
  title,
  subtitle,
  backHref = "/",
  backLabel = "Back",
  children,
}) {
  return (
    <main className="min-h-screen bg-background px-5 pb-12 pt-0 md:px-8">
      <div className="w-full">
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full rounded-xl border border-border bg-card p-6 shadow-2xl shadow-black/20 md:p-8"
        >
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-muted">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </motion.div>
      </div>
    </main>
  );
}
