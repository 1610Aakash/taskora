import EditUserView from '@/screens/admin/Users/EditUser/EditUser.view';
export default function EditUserPage({ params }) {
  return <EditUserView userId={params.userId} />;
}
