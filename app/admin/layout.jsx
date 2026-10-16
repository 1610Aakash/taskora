import { AuthProvider } from "@/context/AuthContext";
import AdminShell from "@/components/layout/AdminShell";

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
