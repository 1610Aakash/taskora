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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <Link href="/" aria-label="Taskora home" className="flex items-center">
          <Image
            src="/Taskora_logo.png"
            alt="Taskora"
            width={126}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <Link href="/login" className="group">
          <motion.span
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/15 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors group-hover:bg-primary"
          >
            <LogIn className="h-4 w-4" />
            Login
          </motion.span>
        </Link>
      </div>
    </motion.nav>
  );
}
