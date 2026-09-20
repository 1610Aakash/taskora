export default function Skeleton({ className = "" }) {
  return <div aria-hidden="true" className={`skeleton rounded-lg ${className}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-7">
      <div><Skeleton className="h-8 w-64" /><Skeleton className="mt-3 h-4 w-80" /></div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-28" />)}
      </div>
      <div className="grid gap-6 md:grid-cols-2"><Skeleton className="h-64" /><Skeleton className="h-64" /></div>
      <Skeleton className="h-56" />
    </div>
  );
}
