import EditTaskView from '@/screens/admin/Tasks/EditTask/EditTask.view';
export default function EditTaskPage({ params }) {
  return <EditTaskView taskId={params.taskId} />;
}
