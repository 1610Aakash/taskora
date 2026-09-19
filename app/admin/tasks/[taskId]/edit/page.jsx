import EditTaskView from "@/screens/admin/Tasks/EditTask/EditTask.view";

export default async function Page({ params }) {
  const { taskId } = await params;
  return <EditTaskView taskId={taskId} />;
}
