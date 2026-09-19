"use client";

import { User, Mail, Loader2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useEditUserViewModel } from "../EditUser.viewmodel";

export default function EditUserForm({ userId }) {
  const { form, errors, serverError, loadingUser, saving, onChange, onSubmit } =
    useEditUserViewModel(userId);

  if (loadingUser) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        id="fullName"
        name="fullName"
        label="Full name"
        icon={User}
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
        value={form.email}
        onChange={onChange}
        error={errors.email}
      />

      {serverError && <p className="text-sm text-danger">{serverError}</p>}

      <Button type="submit" loading={saving}>
        Save changes
      </Button>
    </form>
  );
}
