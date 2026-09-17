import Link from "next/link";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "./components/LoginForm";

export default function LoginView() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to manage your projects and tasks."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/account-setup" className="text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}