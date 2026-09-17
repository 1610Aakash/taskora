import EditProjectView from '@/screens/admin/Projects/EditProject/EditProject.view';
export default function EditProjectPage({ params }) {
  return <EditProjectView projectId={params.projectId} />;
}
