"use client";

import Link from "next/link";
import { Pencil, KeyRound, Loader2 } from "lucide-react";
import { useProfileViewModel } from "../Profile.viewmodel";

export default function ProfileCard() {
  const { profile, loading, error } = useProfileViewModel();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return <p className="py-10 text-center text-sm text-danger">{error || "Unable to load your profile."}</p>;
  }

  const initials = profile.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatarUrl} alt="Profile avatar" className="h-full w-full object-cover" />
          ) : initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">{profile.fullName}</p>
          <p className="text-sm text-muted">{profile.email}</p>
          <span className="mt-1 inline-block rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
            {profile.role}
          </span>
        </div>
      </div>

      <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Phone</dt>
          <dd className="text-foreground">{profile.phone || "—"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Joined</dt>
          <dd className="text-foreground">
            {new Date(profile.joinedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex gap-3">
        <Link
          href="/profile/edit"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-background"
        >
          <Pencil className="h-4 w-4" />
          Edit profile
        </Link>
        <Link
          href="/change-password"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-background"
        >
          <KeyRound className="h-4 w-4" />
          Change password
        </Link>
      </div>
    </div>
  );
}