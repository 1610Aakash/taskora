import { Suspense } from "react";
import EmailVerificationView from "@/screens/auth/EmailVerification/EmailVerification.view";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EmailVerificationView />
    </Suspense>
  );
}