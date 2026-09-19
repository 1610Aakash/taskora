"use client";

import { Loader2, FolderKanban } from "lucide-react";
import ProjectFilterTabs from "./components/ProjectFilterTabs";
import ProjectCard from "./components/ProjectCard";
import { useProjectListViewModel } from "./ProjectList.viewmodel";

export default function ProjectListView() {
  const { projects, loading, filter, setFilter } = useProjectListViewModel();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <p className="mt-1 text-sm text-muted">
          Browse all projects you&apos;re part of.
        </p>
      </div>

      <ProjectFilterTabs value={filter} onChange={setFilter} />

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
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
