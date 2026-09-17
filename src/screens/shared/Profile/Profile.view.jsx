import SectionLayout from "@/components/layout/SectionLayout";
import ProfileCard from "./components/ProfileCard";

export default function ProfileView() {
  return (
    <SectionLayout title="Profile" backHref="/" backLabel="Back to dashboard">
      <ProfileCard />
    </SectionLayout>
  );
}