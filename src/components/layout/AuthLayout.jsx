"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 md:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_88%_82%,rgba(6,182,212,0.1),transparent_28%)]" />
      <div className="surface relative grid w-full max-w-5xl overflow-hidden rounded-2xl lg:grid-cols-[1fr_0.9fr]">
        <div className="hidden flex-col justify-between border-r border-border bg-primary/[0.06] p-10 lg:flex">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Taskora workspace</p>
            <h2 className="mt-8 max-w-sm text-4xl font-bold leading-tight text-foreground">
              Keep every project moving.
            </h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-muted">
              One focused place for projects, tasks, and the people making them happen.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-muted">
            <div className="rounded-xl border border-border bg-background/40 p-3"><strong className="block text-lg text-foreground">01</strong>Plan</div>
            <div className="rounded-xl border border-border bg-background/40 p-3"><strong className="block text-lg text-foreground">02</strong>Assign</div>
            <div className="rounded-xl border border-border bg-background/40 p-3"><strong className="block text-lg text-foreground">03</strong>Deliver</div>
          </div>
        </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full p-7 md:p-10"
      >
        <Link href="/" aria-label="Taskora home" className="mb-8 flex items-center justify-center">
          <Image src="/Taskora_logo.png" alt="Taskora" width={126} height={36} className="h-8 w-auto object-contain" />
        </Link>

        <h1 className="text-center text-2xl font-bold text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-center text-sm text-muted">{subtitle}</p>
        )}

        <div className="mt-6">{children}</div>

        {footer && (
          <div className="mt-6 text-center text-sm text-muted">{footer}</div>
        )}
      </motion.div>
      </div>
    </main>
  );
}
