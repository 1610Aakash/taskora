"use client";

import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Taskora_logo.png"
            alt="Taskora"
            width={32}
            height={32}
            priority
          />
          <span className="text-lg font-bold text-foreground">Taskora</span>
        </Link>

        <Link href="/login">
          <motion.span
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            <LogIn className="h-4 w-4" />
            Login
          </motion.span>
        </Link>
      </div>
    </motion.nav>
  );
}
