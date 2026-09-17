"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupRequest } from "./AccountSetup.model";

export function useAccountSetupViewModel() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      next.email = "Enter a valid email.";
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
      const { email } = await signupRequest(form);
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, errors, serverError, loading, onChange, onSubmit };
}
