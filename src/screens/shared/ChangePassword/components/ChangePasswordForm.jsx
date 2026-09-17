"use client";

import { CheckCircle2 } from "lucide-react";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import { useChangePasswordViewModel } from "../ChangePassword.viewmodel";

export default function ChangePasswordForm() {
  const { form, errors, serverError, loading, success, onChange, onSubmit } = useChangePasswordViewModel();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <PasswordInput
        id="currentPassword"
        name="currentPassword"
        label="Current password"
        placeholder="••••••••"
        value={form.currentPassword}
        onChange={onChange}
        error={errors.currentPassword}
      />

      <PasswordInput
        id="newPassword"
        name="newPassword"
        label="New password"
        placeholder="••••••••"
        value={form.newPassword}
        onChange={onChange}
        error={errors.newPassword}
      />

      <PasswordInput
        id="confirmNewPassword"
        name="confirmNewPassword"
        label="Confirm new password"
        placeholder="••••••••"
        value={form.confirmNewPassword}
        onChange={onChange}
        error={errors.confirmNewPassword}
      />

      {serverError && <p className="text-sm text-danger">{serverError}</p>}
      {success && (
        <p className="flex items-center gap-1.5 text-sm text-success">
          <CheckCircle2 className="h-4 w-4" />
          Password updated.
        </p>
      )}

      <Button type="submit" loading={loading}>
        Update password
      </Button>
    </form>
  );
}