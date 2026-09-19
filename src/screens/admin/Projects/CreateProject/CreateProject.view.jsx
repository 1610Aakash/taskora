import SectionLayout from "@/components/layout/SectionLayout";
import CreateProjectForm from "./components/CreateProjectForm";

export default function CreateProjectView() {
  return (
    <SectionLayout
      title="Create project"
      subtitle="Set up a new project."
      backHref="/admin/projects"
    >
      <CreateProjectForm />
    </SectionLayout>
  );
}
