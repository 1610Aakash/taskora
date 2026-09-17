import MyTaskDetailsView from '@/screens/user/MyTasks/TaskDetails/TaskDetails.view';
export default function MyTaskDetailsPage({ params }) {
  return <MyTaskDetailsView taskId={params.taskId} />;
}
