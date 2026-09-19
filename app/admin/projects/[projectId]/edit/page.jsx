import EditProjectView from "@/screens/admin/Projects/EditProject/EditProject.view";

export default async function Page({ params }) {
  const { projectId } = await params;
  return <EditProjectView projectId={projectId} />;
}
