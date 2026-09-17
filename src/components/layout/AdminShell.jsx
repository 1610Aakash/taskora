import Sidebar from './Sidebar';
import Navbar from './Navbar';

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/tasks', label: 'Tasks' },
];

export default function AdminShell({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={adminLinks} />
      <div className="flex flex-col flex-1">
        <Navbar title="Admin Panel" />
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </div>
  );
}
