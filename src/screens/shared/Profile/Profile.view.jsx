"use client";

import SectionLayout from "@/components/layout/SectionLayout";
import ProfileCard from "./components/ProfileCard";
import { useAuth } from "@/context/AuthContext";

export default function ProfileView() {
  const { user } = useAuth();
  const backHref =
    user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  return (
    <SectionLayout
      title="Profile"
      backHref={backHref}
      backLabel="Back to dashboard"
    >
      <div className="py-4">
        <ProfileCard />
      </div>
    </SectionLayout>
  );
}
