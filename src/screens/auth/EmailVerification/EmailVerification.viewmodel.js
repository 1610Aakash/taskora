"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmailRequest, resendVerificationRequest } from "./EmailVerification.model";

export function useEmailVerificationViewModel() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email") || "";

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let cancelled = false;

    // No token means we landed here right after signup — show a "check your inbox" state
    if (!token) {
      setStatus("pending");
      return;
    }

    verifyEmailRequest(token)
      .then(() => !cancelled && setStatus("success"))
      .catch(() => !cancelled && setStatus("error"));

    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (cooldown === 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const onResend = useCallback(async () => {
    if (cooldown > 0) return;
    setResending(true);
    try {
      await resendVerificationRequest(email);
      setCooldown(30);
    } finally {
      setResending(false);
    }
  }, [email, cooldown]);

  return { status, email, resending, cooldown, onResend };
}