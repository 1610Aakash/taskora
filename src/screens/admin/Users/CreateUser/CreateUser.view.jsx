import SectionLayout from "@/components/layout/SectionLayout";
import CreateUserForm from "./components/CreateUserForm";

export default function CreateUserView() {
  return (
    <SectionLayout
      title="Create user"
      subtitle="Add a new user to your workspace."
      backHref="/admin/users"
    >
      <CreateUserForm />
    </SectionLayout>
  );
}
