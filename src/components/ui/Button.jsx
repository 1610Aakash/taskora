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
    "flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-60";
  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-primary-foreground",
    ghost: "border border-border text-foreground hover:bg-card",
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
