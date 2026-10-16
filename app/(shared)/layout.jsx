import { AuthProvider } from "@/context/AuthContext";
import SharedShell from "@/components/layout/SharedShell";

export default function SharedLayout({ children }) {
  return (
    <AuthProvider>
      <SharedShell>{children}</SharedShell>
    </AuthProvider>
  );
}