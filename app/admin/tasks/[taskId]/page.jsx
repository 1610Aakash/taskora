import AdminTaskDetailsView from "@/screens/admin/Tasks/TaskDetails/TaskDetails.view";

export default async function Page({ params }) {
  const { taskId } = await params;
  return <AdminTaskDetailsView taskId={taskId} />;
}
