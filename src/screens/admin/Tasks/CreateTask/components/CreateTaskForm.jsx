"use client";

import { ListChecks, CalendarDays, Loader2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from "@/lib/constants/options";
import { useCreateTaskViewModel } from "../CreateTask.viewmodel";

export default function CreateTaskForm() {
  const {
    form,
    errors,
    serverError,
    loading,
    loadingOptions,
    options,
    onChange,
    onSubmit,
  } = useCreateTaskViewModel();

  if (loadingOptions) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        id="name"
        name="name"
        label="Task name"
        icon={ListChecks}
        value={form.name}
        onChange={onChange}
        error={errors.name}
      />
      <Textarea
        id="description"
        name="description"
        label="Description"
        value={form.description}
        onChange={onChange}
        error={errors.description}
      />

      <Select
        id="projectId"
        name="projectId"
        label="Project"
        placeholder="Select project"
        options={options.projects}
        value={form.projectId}
        onChange={onChange}
        error={errors.projectId}
      />
      <Select
        id="assignedUserId"
        name="assignedUserId"
        label="Assign to"
        placeholder="Select user"
        options={options.users}
        value={form.assignedUserId}
        onChange={onChange}
        error={errors.assignedUserId}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          id="priority"
          name="priority"
          label="Priority"
          options={PRIORITY_OPTIONS}
          value={form.priority}
          onChange={onChange}
        />
        <Select
          id="status"
          name="status"
          label="Status"
          options={TASK_STATUS_OPTIONS}
          value={form.status}
          onChange={onChange}
        />
      </div>

      <Input
        id="dueDate"
        name="dueDate"
        type="date"
        label="Due date"
        icon={CalendarDays}
        value={form.dueDate}
        onChange={onChange}
        error={errors.dueDate}
      />

      {serverError && <p className="text-sm text-danger">{serverError}</p>}

      <Button type="submit" loading={loading}>
        Create task
      </Button>
    </form>
  );
}
