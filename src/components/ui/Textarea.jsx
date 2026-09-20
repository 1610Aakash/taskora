"use client";

export default function Textarea({ label, error, id, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={3}
        className={`w-full rounded-lg border bg-background/80 px-3 py-3 text-sm leading-6 text-foreground placeholder:text-muted outline-none transition-all duration-200 focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/10 ${
          error ? "border-danger" : "border-border"
        }`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}
