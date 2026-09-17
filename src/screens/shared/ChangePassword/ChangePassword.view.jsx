import SectionLayout from "@/components/layout/SectionLayout";
import ChangePasswordForm from "./components/ChangePasswordForm";

export default function ChangePasswordView() {
  return (
    <SectionLayout title="Change password" subtitle="Update the password for your account." backHref="/profile">
      <ChangePasswordForm />
    </SectionLayout>
  );
}