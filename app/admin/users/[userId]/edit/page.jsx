import EditUserView from "@/screens/admin/Users/EditUser/EditUser.view";

export default async function Page({ params }) {
  const { userId } = await params;
  return <EditUserView userId={userId} />;
}