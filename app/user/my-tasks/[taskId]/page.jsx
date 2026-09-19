import TaskDetailsView from "@/screens/user/MyTasks/TaskDetails/TaskDetails.view";

export default async function Page({ params }) {
  const { taskId } = await params;
  return <TaskDetailsView taskId={taskId} />;
}
