"use client";

import { useState, useEffect } from "react";
import { getProfileRequest } from "./Profile.model";

export function useProfileViewModel() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getProfileRequest().then((data) => {
      if (!cancelled) {
        setProfile(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { profile, loading };
}