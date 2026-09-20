import { Suspense } from "react";
import ResetPasswordView from "@/screens/auth/ResetPassword/ResetPassword.view";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordView />
    </Suspense>
  );
}
