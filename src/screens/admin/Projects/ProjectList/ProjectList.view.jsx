"use client";

import Link from "next/link";
import { Loader2, Plus, FolderKanban } from "lucide-react";
import AdminProjectCard from "./components/AdminProjectCard";
import { useAdminProjectListViewModel } from "./ProjectList.viewmodel";

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
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted">
            Create and manage all projects.
          </p>
        </div>
        <Link
          href="/admin/projects/create"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
              filter === tab.value
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
          <FolderKanban className="h-8 w-8 text-muted" />
          <p className="text-sm text-muted">No projects match this filter.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <AdminProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
