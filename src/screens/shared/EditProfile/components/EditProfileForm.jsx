"use client";

import { User, Mail, Phone, Loader2, Save } from "lucide-react";
import { motion } from "framer-motion";
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
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={onSubmit}
      className="mx-auto max-w-6xl space-y-5 rounded-2xl border border-border/80 bg-card/50 p-6 shadow-xl backdrop-blur-md"
    >
      <AvatarUpload
        preview={avatarPreview}
        name={form.fullName}
        onChange={onAvatarChange}
      />

      <div className="space-y-4">
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
          label="Email address"
          icon={Mail}
          value={form.email}
          onChange={onChange}
          error={errors.email}
        />

        <Input
          id="phone"
          name="phone"
          label="Phone number"
          icon={Phone}
          value={form.phone}
          onChange={onChange}
          error={errors.phone}
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          loading={saving}
          className="w-full justify-center gap-2 shadow-lg shadow-primary/20"
        >
          <Save className="h-4 w-4" />
          Save changes
        </Button>
      </div>
    </motion.form>
  );
}
