"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  Bell,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AppHeader from "./AppHeader";

const NAV_ITEMS = [
  { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/projects", label: "Projects", icon: FolderKanban },
  { href: "/user/my-tasks", label: "My Tasks", icon: ListChecks },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export default function UserShell({ children }) {
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
      <aside className="fixed bottom-0 left-0 top-16 hidden w-60 flex-col border-r border-border bg-card md:flex">
        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted hover:bg-background hover:text-foreground"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {label}
              </Link>
            );
          })}
        </nav>

      </aside>

      <div className="pt-16 md:pl-60">
        <main className="w-full px-5 py-8 md:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
