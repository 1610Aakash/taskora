import SectionLayout from "@/components/layout/SectionLayout";
import EditProfileForm from "./components/EditProfileForm";

export default function EditProfileView() {
  return (
    <SectionLayout
      title="Edit profile"
      subtitle="Update your personal information."
      backHref="/profile"
    >
      <div className="py-4">
        <EditProfileForm />
      </div>
    </SectionLayout>
  );
}
