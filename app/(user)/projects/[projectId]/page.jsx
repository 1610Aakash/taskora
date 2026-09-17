import UserProjectDetailsView from '@/screens/user/Projects/ProjectDetails/ProjectDetails.view';
export default function UserProjectDetailsPage({ params }) {
  return <UserProjectDetailsView projectId={params.projectId} />;
}
