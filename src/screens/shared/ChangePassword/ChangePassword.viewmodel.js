"use client";

import { useState } from "react";
import { changePasswordRequest } from "./ChangePassword.model";

export function useChangePasswordViewModel() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
    setSuccess(false);
  };

  const validate = () => {
    const next = {};
    if (!form.currentPassword) next.currentPassword = "Current password is required.";
    if (!form.newPassword) next.newPassword = "New password is required.";
    else if (form.newPassword.length < 8) next.newPassword = "At least 8 characters.";
    if (form.confirmNewPassword !== form.newPassword) next.confirmNewPassword = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await changePasswordRequest(form);
      setSuccess(true);
      setForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, errors, serverError, loading, success, onChange, onSubmit };
}