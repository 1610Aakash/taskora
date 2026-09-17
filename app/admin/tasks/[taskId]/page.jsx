import AdminTaskDetailsView from '@/screens/admin/Tasks/TaskDetails/TaskDetails.view';
export default function AdminTaskDetailsPage({ params }) {
  return <AdminTaskDetailsView taskId={params.taskId} />;
}
