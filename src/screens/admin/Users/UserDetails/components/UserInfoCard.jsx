import Link from "next/link";
import { Pencil, Power } from "lucide-react";
import Button from "@/components/ui/Button";

export default function UserInfoCard({ user, toggling, onToggleStatus }) {
  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          {initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">
            {user.fullName}
          </p>
          <p className="text-sm text-muted">{user.email}</p>
          <span
            className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
              user.status === "active"
                ? "bg-success/15 text-success"
                : "bg-muted/15 text-muted"
            }`}
          >
            {user.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Role</dt>
          <dd className="capitalize text-foreground">{user.role}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Joined</dt>
          <dd className="text-foreground">
            {new Date(user.joinedAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/admin/users/${user.id}/edit`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-background"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Link>
        <Button
          onClick={onToggleStatus}
          loading={toggling}
          variant={user.status === "active" ? "ghost" : "primary"}
          className="flex-1"
        >
          <Power className="h-4 w-4" />
          {user.status === "active" ? "Deactivate" : "Activate"}
        </Button>
      </div>
    </div>
  );
}
