import SectionLayout from "@/components/layout/SectionLayout";
import EditUserForm from "./components/EditUserForm";

export default function EditUserView({ userId }) {
  return (
    <SectionLayout title="Edit user" backHref={`/admin/users/${userId}`}>
      <EditUserForm userId={userId} />
    </SectionLayout>
  );
}
