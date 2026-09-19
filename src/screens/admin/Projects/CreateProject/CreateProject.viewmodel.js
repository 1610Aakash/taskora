"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProjectRequest } from "./CreateProject.model";

export function useCreateProjectViewModel() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "in-progress",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      await createProjectRequest(form);
      router.push("/admin/projects");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, errors, serverError, loading, onChange, onSubmit };
}
