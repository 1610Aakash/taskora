"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function AppHeader({ onLogout }) {
  const { user } = useAuth();
  const initials = user?.fullName
    ? user.fullName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[4.5rem] border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="Taskora home" className="flex items-center">
          <Image
            src="/Taskora_logo.png"
            alt="Taskora"
            width={126}
            height={36}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-background"
            aria-label="Open profile"
          >
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {user?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : initials}
            </span>
            <span className="hidden max-w-36 truncate text-sm font-medium text-foreground sm:block">
              {user?.fullName || "Profile"}
            </span>
            <UserCircle className="h-4 w-4 text-muted" />
          </Link>
          <motion.button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
            aria-label="Log out"
            whileTap={{ scale: 0.96 }}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Log out</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}