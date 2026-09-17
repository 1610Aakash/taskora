"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import { useLoginViewModel } from "../Login.viewmodel";

export default function LoginForm() {
  const { form, errors, loading, serverError, onChange, onSubmit } = useLoginViewModel();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      {serverError && <p className="text-sm text-danger">{serverError}</p>}

      <Button type="submit" loading={loading}>
        Login
      </Button>
    </form>
  );
}