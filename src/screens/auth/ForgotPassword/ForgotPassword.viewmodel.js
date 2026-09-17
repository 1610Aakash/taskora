"use client";

import { useState } from "react";
import { forgotPasswordRequest } from "./ForgotPassword.model";

export function useForgotPasswordViewModel() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError("Email is required.");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Enter a valid email.");

    setLoading(true);
    try {
      await forgotPasswordRequest({ email });
      setSent(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { email, error, loading, sent, onChange, onSubmit };
}
