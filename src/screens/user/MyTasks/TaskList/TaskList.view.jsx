"use client";

import { Loader2, ListChecks } from "lucide-react";
import TaskFilterTabs from "./components/TaskFilterTabs";
import TaskRow from "./components/TaskRow";
import { useTaskListViewModel } from "./TaskList.viewmodel";

export default function TaskListView() {
  const { tasks, loading, filter, setFilter } = useTaskListViewModel();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
        <p className="mt-1 text-sm text-muted">
          Tasks assigned to you across all projects.
        </p>
      </div>

      <TaskFilterTabs value={filter} onChange={setFilter} />

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
          <ListChecks className="h-8 w-8 text-muted" />
          <p className="text-sm text-muted">No tasks match this filter.</p>
        </div>
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </div>
      )}
    </div>
  );
}
