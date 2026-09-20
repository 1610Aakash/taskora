import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "./components/LoginForm";

export default function LoginView() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Use the email and password assigned by your administrator."
      footer="Need access? Ask your administrator to create your account."
    >
      <LoginForm />
    </AuthLayout>
  );
}