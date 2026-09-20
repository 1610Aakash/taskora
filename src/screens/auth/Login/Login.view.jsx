"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "./components/LoginForm";
import { ShieldCheck, Info } from "lucide-react";

export default function LoginView() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Use the email and password assigned by your administrator."
      footer={
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
          <Info className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span>
            Need access? Ask your administrator to create your account.
          </span>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
