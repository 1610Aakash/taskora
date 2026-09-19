import UserDetailsView from "@/screens/admin/Users/UserDetails/UserDetails.view";

export default async function Page({ params }) {
  const { userId } = await params;
  return <UserDetailsView userId={userId} />;
}
