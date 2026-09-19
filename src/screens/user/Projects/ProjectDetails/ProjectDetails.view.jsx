"use client";

import { Loader2 } from "lucide-react";
import ProjectSummaryHeader from "./components/ProjectSummaryHeader";
import ProjectTaskList from "./components/ProjectTaskList";
import { useProjectDetailsViewModel } from "./ProjectDetails.viewmodel";

export default function ProjectDetailsView({ projectId }) {
  const { project, tasks, loading, error } =
    useProjectDetailsViewModel(projectId);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <p className="py-16 text-center text-sm text-danger">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <ProjectSummaryHeader project={project} />
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Tasks in this project
        </h2>
        <ProjectTaskList tasks={tasks} />
      </div>
    </div>
  );
}
