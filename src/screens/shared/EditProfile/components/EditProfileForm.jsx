"use client";

import { User, Mail, Phone, Loader2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AvatarUpload from "./AvatarUpload";
import { useEditProfileViewModel } from "../EditProfile.viewmodel";

export default function EditProfileForm() {
  const {
    form,
    errors,
    avatarPreview,
    loadingProfile,
    saving,
    onChange,
    onAvatarChange,
    onSubmit,
  } = useEditProfileViewModel();

  if (loadingProfile) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <AvatarUpload preview={avatarPreview} name={form.fullName} onChange={onAvatarChange} />

      <Input
        id="fullName"
        name="fullName"
        label="Full name"
        icon={User}
        value={form.fullName}
        onChange={onChange}
        error={errors.fullName}
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        icon={Mail}
        value={form.email}
        onChange={onChange}
        error={errors.email}
      />

      <Input
        id="phone"
        name="phone"
        label="Phone"
        icon={Phone}
        value={form.phone}
        onChange={onChange}
        error={errors.phone}
      />

      <Button type="submit" loading={saving}>
        Save changes
      </Button>
    </form>
  );
}