import AdminProjectDetailsView from "@/screens/admin/Projects/ProjectDetails/ProjectDetails.view";

export default async function Page({ params }) {
  const { projectId } = await params;
  return <AdminProjectDetailsView projectId={projectId} />;
}
