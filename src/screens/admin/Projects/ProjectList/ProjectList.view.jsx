"use client";

import Link from "next/link";
import { Loader2, Plus, FolderKanban } from "lucide-react";
import AdminProjectCard from "./components/AdminProjectCard";
import { useAdminProjectListViewModel } from "./ProjectList.viewmodel";
import EmptyState from "@/components/common/EmptyState";
import Button from "@/components/ui/Button";
import { MotionItem, MotionPage } from "@/components/animations/Motion";

const TABS = [
  { value: "all", label: "All" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On Hold" },
];

export default function AdminProjectListView() {
  const { projects, loading, filter, setFilter } =
    useAdminProjectListViewModel();

  return (
    <MotionPage className="space-y-7">
      <MotionItem><div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted">
            Create and manage all projects.
          </p>
        </div>
        <Link
          href="/admin/projects/create"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:bg-primary-hover hover:shadow-primary/25"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Link>
      </div></MotionItem>

      <MotionItem><div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
              filter === tab.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted hover:bg-card-elevated hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div></MotionItem>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : projects.length === 0 ? (
        <EmptyState icon={FolderKanban} title="No projects found" description="Try another filter or create a project to get your team moving." action={<Link href="/admin/projects/create"><Button className="w-auto">Create project</Button></Link>} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <AdminProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </MotionPage>
  );
}
