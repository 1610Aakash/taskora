import UserDetailsView from '@/screens/admin/Users/UserDetails/UserDetails.view';
export default function UserDetailsPage({ params }) {
  return <UserDetailsView userId={params.userId} />;
}
