"use client";

import { Mail, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useForgotPasswordViewModel } from "../ForgotPassword.viewmodel";

export default function ForgotPasswordForm() {
  const { email, error, loading, sent, onChange, onSubmit } =
    useForgotPasswordViewModel();

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-4 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-success" />
        <p className="text-sm text-foreground">
          If an account exists for <span className="font-medium">{email}</span>,
          a reset link has been sent.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        id="email"
        type="email"
        label="Email"
        icon={Mail}
        placeholder="you@example.com"
        value={email}
        onChange={onChange}
        error={error}
      />
      <Button type="submit" loading={loading}>
        Send reset link
      </Button>
    </form>
  );
}
