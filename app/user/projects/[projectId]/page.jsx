import ProjectDetailsView from "@/screens/user/Projects/ProjectDetails/ProjectDetails.view";

export default async function Page({ params }) {
  const { projectId } = await params;
  return <ProjectDetailsView projectId={projectId} />;
}
