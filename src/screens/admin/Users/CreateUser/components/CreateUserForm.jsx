"use client";

import { User, Mail } from "lucide-react";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import { useCreateUserViewModel } from "../CreateUser.viewmodel";

export default function CreateUserForm() {
  const { form, errors, serverError, loading, onChange, onSubmit } =
    useCreateUserViewModel();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        id="fullName"
        name="fullName"
        label="Full name"
        icon={User}
        placeholder="Jane Doe"
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
        placeholder="jane@example.com"
        value={form.email}
        onChange={onChange}
        error={errors.email}
      />

      <PasswordInput
        id="password"
        name="password"
        label="Initial password"
        placeholder="Create a password for this user"
        value={form.password}
        onChange={onChange}
        error={errors.password}
      />

      <p className="text-xs text-muted">
        Share these login details securely. The user can change their password
        later from their profile.
      </p>

      {serverError && <p className="text-sm text-danger">{serverError}</p>}

      <Button type="submit" loading={loading}>
        Create user
      </Button>
    </form>
  );
}
