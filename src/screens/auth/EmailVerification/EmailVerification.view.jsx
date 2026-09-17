import AuthLayout from "@/components/layout/AuthLayout";
import VerificationStatus from "./components/VerificationStatus";

export default function EmailVerificationView() {
  return (
    <AuthLayout title="Email verification">
      <VerificationStatus />
    </AuthLayout>
  );
}
