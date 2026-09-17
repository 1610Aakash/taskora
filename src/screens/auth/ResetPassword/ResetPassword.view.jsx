import AuthLayout from "@/components/layout/AuthLayout";
import ResetPasswordForm from "./components/ResetPasswordForm";

export default function ResetPasswordView() {
  return (
    <AuthLayout title="Reset password" subtitle="Choose a new password for your account.">
      <ResetPasswordForm />
    </AuthLayout>
  );
}