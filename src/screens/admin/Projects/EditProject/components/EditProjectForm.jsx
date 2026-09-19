"use client";

import { FolderKanban, CalendarDays, Loader2, Trash2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { PROJECT_STATUS_OPTIONS } from "@/lib/constants/options";
import { useEditProjectViewModel } from "../EditProject.viewmodel";

export default function EditProjectForm({ projectId }) {
  const {
    form,
    errors,
    serverError,
    loadingProject,
    saving,
    deleting,
    onChange,
    onSubmit,
    onDelete,
  } = useEditProjectViewModel(projectId);

  if (loadingProject) {
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
        label="Project name"
        icon={FolderKanban}
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
        id="status"
        name="status"
        label="Status"
        options={PROJECT_STATUS_OPTIONS}
        value={form.status}
        onChange={onChange}
      />
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

      <div className="flex gap-3">
        <Button type="submit" loading={saving}>
          Save changes
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onDelete}
          loading={deleting}
          className="w-auto shrink-0 px-4 text-danger"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
