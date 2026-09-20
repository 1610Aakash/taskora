"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ListChecks,
  Bell,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AppHeader from "./AppHeader";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/tasks", label: "Tasks", icon: ListChecks },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const onLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader onLogout={onLogout} />
      <aside className="fixed bottom-0 left-0 top-[4.5rem] hidden w-64 flex-col border-r border-border/80 bg-card/55 px-3 py-5 md:flex">
        <div className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted/70">Workspace</div>
        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <motion.div key={href} whileHover={{ x: 2 }} transition={{ duration: 0.16 }}>
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/15 text-foreground shadow-sm shadow-primary/10 before:absolute before:inset-y-1 before:left-0 before:w-0.5 before:rounded-full before:bg-primary"
                    : "text-muted hover:bg-card-elevated hover:text-foreground"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {label}
              </Link>
              </motion.div>
            );
          })}
        </nav>

      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-around rounded-2xl border border-border bg-card/95 p-2 shadow-2xl backdrop-blur-xl md:hidden">
        {NAV_ITEMS.slice(0, 4).map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return <Link key={href} href={href} aria-label={label} className={`rounded-xl p-3 ${active ? "bg-primary/15 text-primary" : "text-muted"}`}><Icon className="h-5 w-5" /></Link>;
        })}
      </nav>

      <div className="pt-[4.5rem] md:pl-64">
        <main className="w-full px-5 py-8 md:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
