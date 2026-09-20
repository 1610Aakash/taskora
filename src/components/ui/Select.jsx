"use client";

import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  icon: Icon,
  error,
  id,
  options,
  placeholder,
  ...props
}) {
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
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
        )}
        <select
          id={id}
          className={`h-11 w-full appearance-none rounded-lg border bg-background/80 px-3 pr-9 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/10 ${
            Icon ? "pl-10" : ""
          } ${error ? "border-danger focus:ring-danger/10" : "border-border"}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}
