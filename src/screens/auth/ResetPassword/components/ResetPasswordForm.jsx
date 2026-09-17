"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import { useResetPasswordViewModel } from "../ResetPassword.viewmodel";

export default function ResetPasswordForm() {
  const { form, errors, serverError, loading, success, onChange, onSubmit } = useResetPasswordViewModel();

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-4 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-success" />
        <p className="text-sm text-foreground">Password reset! Redirecting to login…</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <PasswordInput
        id="password"
        name="password"
        label="New password"
        placeholder="••••••••"
        value={form.password}
        onChange={onChange}
        error={errors.password}
      />
      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        placeholder="••••••••"
        value={form.confirmPassword}
        onChange={onChange}
        error={errors.confirmPassword}
      />

      {serverError && <p className="text-sm text-danger">{serverError}</p>}

      <Button type="submit" loading={loading}>
        Reset password
      </Button>
    </form>
  );
}