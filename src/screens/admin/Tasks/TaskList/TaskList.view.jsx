"use client";

import Link from "next/link";
import { Loader2, Plus, ListChecks } from "lucide-react";
import AdminTaskRow from "./components/AdminTaskRow";
import { useAdminTaskListViewModel } from "./TaskList.viewmodel";
import EmptyState from "@/components/common/EmptyState";
import Button from "@/components/ui/Button";
import { MotionItem, MotionPage } from "@/components/animations/Motion";

const TABS = [
  { value: "all", label: "All" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function AdminTaskListView() {
  const { tasks, loading, filter, setFilter } = useAdminTaskListViewModel();

  return (
    <MotionPage className="space-y-7">
      <MotionItem><div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
          <p className="mt-1 text-sm text-muted">
            All tasks across every project.
          </p>
        </div>
        <Link
          href="/admin/tasks/create"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4" />
          Add Task
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
      ) : tasks.length === 0 ? (
        <EmptyState icon={ListChecks} title="No tasks found" description="Your filtered task list is clear. Add a task when there is work to move forward." action={<Link href="/admin/tasks/create"><Button className="w-auto">Create task</Button></Link>} />
      ) : (
        <div className="surface divide-y divide-border-subtle overflow-hidden rounded-2xl">
          {tasks.map((t) => (
            <AdminTaskRow key={t.id} task={t} />
          ))}
        </div>
      )}
    </MotionPage>
  );
}
