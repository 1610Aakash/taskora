"use client";

import { Loader2 } from "lucide-react";
import SectionLayout from "@/components/layout/SectionLayout";
import UserInfoCard from "./components/UserInfoCard";
import { useUserDetailsViewModel } from "./UserDetails.viewmodel";

export default function UserDetailsView({ userId }) {
  const { user, loading, error, toggling, onToggleStatus } =
    useUserDetailsViewModel(userId);

  return (
    <SectionLayout title="User details" backHref="/admin/users">
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : error ? (
        <p className="text-center text-sm text-danger">{error}</p>
      ) : (
        <UserInfoCard
          user={user}
          toggling={toggling}
          onToggleStatus={onToggleStatus}
        />
      )}
    </SectionLayout>
  );
}
