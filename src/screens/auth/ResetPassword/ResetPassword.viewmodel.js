"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordRequest } from "./ResetPassword.model";

export function useResetPasswordViewModel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8) next.password = "At least 8 characters.";
    if (form.confirmPassword !== form.password)
      next.confirmPassword = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await resetPasswordRequest({ token, password: form.password });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1800);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, errors, serverError, loading, success, onChange, onSubmit };
}
