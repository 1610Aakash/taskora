"use client";

export default function Input({ label, icon: Icon, error, id, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
        )}
        <input
          id={id}
          className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-primary ${
            Icon ? "pl-10" : ""
          } ${error ? "border-danger" : "border-border"}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}