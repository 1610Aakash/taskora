import AdminProjectDetailsView from '@/screens/admin/Projects/ProjectDetails/ProjectDetails.view';
export default function AdminProjectDetailsPage({ params }) {
  return <AdminProjectDetailsView projectId={params.projectId} />;
}
