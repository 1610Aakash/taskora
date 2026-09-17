import Link from "next/link";
import AuthLayout from "@/components/layout/AuthLayout";
import AccountSetupForm from "./components/AccountSetupForm";

export default function AccountSetupView() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Get started with Taskora in a few seconds."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <AccountSetupForm />
    </AuthLayout>
  );
}