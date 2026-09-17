"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-2xl shadow-black/20"
      >
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <Image src="/Taskora_logo.png" alt="Taskora" width={32} height={32} />
          <span className="text-lg font-bold text-foreground">Taskora</span>
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
    </main>
  );
}
