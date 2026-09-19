"use client";

import Link from "next/link";
import { Loader2, Plus, ListChecks } from "lucide-react";
import AdminTaskRow from "./components/AdminTaskRow";
import { useAdminTaskListViewModel } from "./TaskList.viewmodel";

const TABS = [
  { value: "all", label: "All" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function AdminTaskListView() {
  const { tasks, loading, filter, setFilter } = useAdminTaskListViewModel();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
          <p className="mt-1 text-sm text-muted">
            All tasks across every project.
          </p>
        </div>
        <Link
          href="/admin/tasks/create"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4" />
          Add Task
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
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
          <ListChecks className="h-8 w-8 text-muted" />
          <p className="text-sm text-muted">No tasks match this filter.</p>
        </div>
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {tasks.map((t) => (
            <AdminTaskRow key={t.id} task={t} />
          ))}
        </div>
      )}
    </div>
  );
}
