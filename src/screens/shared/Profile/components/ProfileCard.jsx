"use client";

import Link from "next/link";
import {
  Pencil,
  KeyRound,
  Loader2,
  Phone,
  Calendar,
  Mail,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { useProfileViewModel } from "../Profile.viewmodel";

export default function ProfileCard() {
  const { profile, loading, error } = useProfileViewModel();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="rounded-xl border border-danger/20 bg-danger/10 p-6 text-center text-sm text-danger">
        {error || "Unable to load your profile."}
      </div>
    );
  }

  const initials = profile.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl space-y-6"
    >
      {/* Profile Header Card */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/80 bg-card/60 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-md sm:flex-row sm:text-left">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-primary/10 text-2xl font-bold text-primary shadow-inner">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Profile avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-card bg-success" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h2 className="text-xl font-bold text-foreground">
              {profile.fullName}
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Shield className="h-3 w-3" />
              {profile.role}
            </span>
          </div>
          <p className="text-sm text-muted">{profile.email}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3.5 rounded-xl border border-border/70 bg-card/40 p-4">
          <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
            <Phone className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted">Phone Number</p>
            <p className="text-sm font-semibold text-foreground">
              {profile.phone || "Not set"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-border/70 bg-card/40 p-4">
          <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted">Joined Workspace</p>
            <p className="text-sm font-semibold text-foreground">
              {new Date(profile.joinedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row pt-2">
        <Link
          href="/profile/edit"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground shadow-sm"
        >
          <Pencil className="h-4 w-4" />
          Edit profile
        </Link>
        <Link
          href="/change-password"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-border/60 shadow-sm"
        >
          <KeyRound className="h-4 w-4 text-muted" />
          Change password
        </Link>
      </div>
    </motion.div>
  );
}
