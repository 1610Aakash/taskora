"use client";

import { User, Mail } from "lucide-react";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import { useAccountSetupViewModel } from "../AccountSetup.viewmodel";

export default function AccountSetupForm() {
  const { form, errors, serverError, loading, onChange, onSubmit } =
    useAccountSetupViewModel();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        id="fullName"
        name="fullName"
        label="Full name"
        icon={User}
        placeholder="Aakash Sharma"
        value={form.fullName}
        onChange={onChange}
        error={errors.fullName}
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        icon={Mail}
        placeholder="you@example.com"
        value={form.email}
        onChange={onChange}
        error={errors.email}
      />

      <PasswordInput
        id="password"
        name="password"
        label="Password"
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
        Create account
      </Button>
    </form>
  );
}
