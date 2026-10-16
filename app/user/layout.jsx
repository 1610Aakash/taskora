import { AuthProvider } from "@/context/AuthContext";
import UserShell from "@/components/layout/UserShell";

export default function UserLayout({ children }) {
  return (
    <AuthProvider>
      <UserShell>{children}</UserShell>
    </AuthProvider>
  );
}
