import Link from "next/link";

export default function UserCard({ user }) {
  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/admin/users/${user.id}`}
      className="interactive-surface surface flex items-center justify-between gap-3 rounded-2xl p-4"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {user.fullName}
          </p>
          <p className="truncate text-xs text-muted">{user.email}</p>
        </div>
      </div>
      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
          user.status === "active"
            ? "bg-success/15 text-success"
            : "bg-muted/15 text-muted"
        }`}
      >
        {user.status === "active" ? "Active" : "Inactive"}
      </span>
    </Link>
  );
}
