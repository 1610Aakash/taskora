"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getTaskRequest,
  getTaskFormOptionsRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "./EditTask.model";

export function useEditTaskViewModel(taskId) {
  const router = useRouter();
  const [options, setOptions] = useState({ projects: [], users: [] });
  const [form, setForm] = useState({
    name: "",
    description: "",
    projectId: "",
    assignedUserId: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loadingTask, setLoadingTask] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getTaskRequest(taskId), getTaskFormOptionsRequest()]).then(
      ([task, opts]) => {
        if (cancelled) return;
        setForm({
          name: task.name,
          description: task.description,
          projectId: task.projectId,
          assignedUserId: task.assignedUserId,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
        });
        setOptions(opts);
        setLoadingTask(false);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [taskId]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Task name is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    if (!form.projectId) next.projectId = "Select a project.";
    if (!form.assignedUserId) next.assignedUserId = "Assign a user.";
    if (!form.dueDate) next.dueDate = "Due date is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSaving(true);
    try {
      await updateTaskRequest(taskId, form);
      router.push(`/admin/tasks/${taskId}`);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("Delete this task? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteTaskRequest(taskId);
      router.push("/admin/tasks");
    } finally {
      setDeleting(false);
    }
  };

  return {
    form,
    errors,
    serverError,
    loadingTask,
    saving,
    deleting,
    options,
    onChange,
    onSubmit,
    onDelete,
  };
}
