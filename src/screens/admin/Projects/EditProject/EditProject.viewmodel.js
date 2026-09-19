"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getProjectRequest,
  updateProjectRequest,
  deleteProjectRequest,
} from "./EditProject.model";

export function useEditProjectViewModel(projectId) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "in-progress",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loadingProject, setLoadingProject] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getProjectRequest(projectId).then((p) => {
      if (!cancelled) {
        setForm({
          name: p.name,
          description: p.description,
          status: p.status,
          dueDate: p.dueDate,
        });
        setLoadingProject(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Project name is required.";
    if (!form.description.trim()) next.description = "Description is required.";
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
      await updateProjectRequest(projectId, form);
      router.push(`/admin/projects/${projectId}`);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteProjectRequest(projectId);
      router.push("/admin/projects");
    } finally {
      setDeleting(false);
    }
  };

  return {
    form,
    errors,
    serverError,
    loadingProject,
    saving,
    deleting,
    onChange,
    onSubmit,
    onDelete,
  };
}
