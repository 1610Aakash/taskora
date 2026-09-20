import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

export default function ForgotPasswordView() {
  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your account email and we&apos;ll help you reset access."
      footer={
        <Link href="/login" className="flex items-center justify-center gap-1 text-primary hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to login
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}