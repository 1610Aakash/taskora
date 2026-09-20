import Link from "next/link";
import { ArrowRight, FolderKanban, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import StatusBadge from "@/components/common/StatusBadge";

export default function RecentProjectsCard({ projects }) {
  return (
    <div className="surface rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <FolderKanban className="h-4 w-4 text-primary" />
          Ongoing Projects
        </h2>
        <Link
          href="/admin/projects"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="interactive-surface rounded-xl border border-border-subtle bg-background/30 p-3">
            <div className="flex items-center justify-between gap-3">
              <Link
                href={`/admin/projects/${p.id}`}
                className="truncate text-sm font-medium text-foreground hover:text-primary"
              >
                {p.name}
              </Link>
              <div className="flex items-center gap-2">
                <StatusBadge status={p.status} />
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="text-muted hover:text-primary"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.round((p.completedCount / p.taskCount) * 100)}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${Math.round((p.completedCount / p.taskCount) * 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
