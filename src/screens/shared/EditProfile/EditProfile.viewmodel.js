"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getProfileRequest, updateProfileRequest } from "./EditProfile.model";

export function useEditProfileViewModel() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getProfileRequest().then((data) => {
      if (!cancelled) {
        setForm({ fullName: data.fullName, email: data.email, phone: data.phone });
        setAvatarPreview(data.avatarUrl);
        setLoadingProfile(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      await updateProfileRequest({ ...form, avatarUrl: avatarPreview });
      await refreshUser();
      router.push("/profile");
    } finally {
      setSaving(false);
    }
  };

  return { form, errors, avatarPreview, loadingProfile, saving, onChange, onAvatarChange, onSubmit };
}