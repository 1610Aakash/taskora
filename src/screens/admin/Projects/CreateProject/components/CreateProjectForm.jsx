"use client";

import { FolderKanban, CalendarDays } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { PROJECT_STATUS_OPTIONS } from "@/lib/constants/options";
import { useCreateProjectViewModel } from "../CreateProject.viewmodel";

export default function CreateProjectForm() {
  const { form, errors, serverError, loading, onChange, onSubmit } =
    useCreateProjectViewModel();

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

      <Button type="submit" loading={loading}>
        Create project
      </Button>
    </form>
  );
}
