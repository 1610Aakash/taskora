'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ links = [] }) {
  const pathname = usePathname();
  return (
    <aside className="w-60 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="px-6 py-5 border-b border-border">
        <span className="text-xl font-bold text-foreground">Taskora</span>
      </div>
      <nav className="flex flex-col gap-1 p-4 flex-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-primary text-white'
                : 'text-secondary-text hover:bg-card-elevated hover:text-foreground'
            }`}
          >
            {Icon && <Icon size={16} />}
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
