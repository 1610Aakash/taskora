"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getTaskFormOptionsRequest,
  createTaskRequest,
} from "./CreateTask.model";

export function useCreateTaskViewModel() {
  const router = useRouter();
  const [options, setOptions] = useState({ projects: [], users: [] });
  const [loadingOptions, setLoadingOptions] = useState(true);
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getTaskFormOptionsRequest().then((data) => {
      if (!cancelled) {
        setOptions(data);
        setLoadingOptions(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

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

    setLoading(true);
    try {
      await createTaskRequest(form);
      router.push("/admin/tasks");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    serverError,
    loading,
    loadingOptions,
    options,
    onChange,
    onSubmit,
  };
}
