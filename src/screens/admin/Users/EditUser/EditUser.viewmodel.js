"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserRequest, updateUserRequest } from "./EditUser.model";

export function useEditUserViewModel(userId) {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getUserRequest(userId).then((user) => {
      if (!cancelled) {
        setForm({ fullName: user.fullName, email: user.email });
        setLoadingUser(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSaving(true);
    try {
      await updateUserRequest(userId, form);
      router.push(`/admin/users/${userId}`);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return { form, errors, serverError, loadingUser, saving, onChange, onSubmit };
}
