import Sidebar from './Sidebar';
import Navbar from './Navbar';

const userLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/projects', label: 'Projects' },
  { href: '/my-tasks', label: 'My Tasks' },
];

export default function UserShell({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={userLinks} />
      <div className="flex flex-col flex-1">
        <Navbar title="Taskora" />
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </div>
  );
}
