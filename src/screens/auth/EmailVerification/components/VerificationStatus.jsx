"use client";

import { Loader2, CheckCircle2, XCircle, MailCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useEmailVerificationViewModel } from "../EmailVerification.viewmodel";

export default function VerificationStatus() {
  const { status, email, resending, cooldown, onResend } =
    useEmailVerificationViewModel();

  const wrap = (children) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-3 py-4 text-center"
    >
      {children}
    </motion.div>
  );

  if (status === "verifying") {
    return wrap(
      <>
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted">Verifying your email…</p>
      </>,
    );
  }

  if (status === "success") {
    return wrap(
      <>
        <CheckCircle2 className="h-10 w-10 text-success" />
        <p className="text-sm text-foreground">Your email has been verified.</p>
        <Link href="/login" className="text-sm text-primary hover:underline">
          Continue to login
        </Link>
      </>,
    );
  }

  if (status === "error") {
    return wrap(
      <>
        <XCircle className="h-10 w-10 text-danger" />
        <p className="text-sm text-foreground">
          This verification link is invalid or expired.
        </p>
        <Button
          onClick={onResend}
          loading={resending}
          disabled={cooldown > 0}
          className="mt-2 w-auto px-6"
        >
          {cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Resend verification email"}
        </Button>
      </>,
    );
  }

  // pending — just signed up, no token yet
  return wrap(
    <>
      <MailCheck className="h-10 w-10 text-primary" />
      <p className="text-sm text-foreground">
        We sent a verification link to{" "}
        <span className="font-medium">{email || "your email"}</span>.
      </p>
      <Button
        onClick={onResend}
        loading={resending}
        disabled={cooldown > 0}
        className="mt-2 w-auto px-6"
      >
        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email"}
      </Button>
    </>,
  );
}
