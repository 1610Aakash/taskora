"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  loading,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55";
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-primary/15 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/15",
    ghost: "border border-border bg-card text-foreground hover:border-primary/50 hover:bg-card-elevated",
    danger: "bg-danger/90 text-white hover:bg-danger",
    subtle: "border border-border-subtle bg-background text-muted hover:bg-card-elevated hover:text-foreground",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
