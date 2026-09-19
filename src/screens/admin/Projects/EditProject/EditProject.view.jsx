import SectionLayout from "@/components/layout/SectionLayout";
import EditProjectForm from "./components/EditProjectForm";

export default function EditProjectView({ projectId }) {
  return (
    <SectionLayout
      title="Edit project"
      backHref={`/admin/projects/${projectId}`}
    >
      <EditProjectForm projectId={projectId} />
    </SectionLayout>
  );
}
