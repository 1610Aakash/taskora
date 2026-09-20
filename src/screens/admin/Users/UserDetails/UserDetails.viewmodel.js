"use client";

import { useState, useEffect } from "react";
import { getUserRequest, toggleUserStatusRequest } from "./UserDetails.model";

export function useUserDetailsViewModel(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    getUserRequest(userId)
      .then((data) => !cancelled && setUser(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const onToggleStatus = async () => {
    setToggling(true);
    try {
      const updated = await toggleUserStatusRequest(userId, user.status);
      setUser(updated);
    } finally {
      setToggling(false);
    }
  };

  return { user, loading, error, toggling, onToggleStatus };
}
