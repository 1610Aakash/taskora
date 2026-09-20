"use client";

import Link from "next/link";
import { Loader2, UserPlus, Search, Users } from "lucide-react";
import UserCard from "./components/UserCard";
import { useUserListViewModel } from "./UserList.viewmodel";
import EmptyState from "@/components/common/EmptyState";
import Button from "@/components/ui/Button";
import { MotionItem, MotionPage } from "@/components/animations/Motion";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function UserListView() {
  const { users, loading, search, setSearch, statusFilter, setStatusFilter } =
    useUserListViewModel();

  return (
    <MotionPage className="space-y-7">
      <MotionItem><div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="mt-1 text-sm text-muted">
            Manage everyone who has access to Taskora.
          </p>
        </div>
        <Link
          href="/admin/users/create"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:bg-primary-hover"
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </Link>
      </div></MotionItem>

      <MotionItem><div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === tab.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border text-muted hover:bg-card-elevated hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="h-11 w-56 rounded-lg border border-border bg-background/80 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div></MotionItem>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : users.length === 0 ? (
        <EmptyState icon={Users} title="No users found" description="Try another search or add a teammate to your workspace." action={<Link href="/admin/users/create"><Button className="w-auto">Add user</Button></Link>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {users.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      )}
    </MotionPage>
  );
}
