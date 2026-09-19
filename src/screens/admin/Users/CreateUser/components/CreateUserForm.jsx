"use client";

import { User, Mail } from "lucide-react";
import Input from "@/components/ui/Input";
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

      <p className="text-xs text-muted">
        The user will receive an email to set their password and verify their
        account.
      </p>

      {serverError && <p className="text-sm text-danger">{serverError}</p>}

      <Button type="submit" loading={loading}>
        Create user
      </Button>
    </form>
  );
}
