"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ label, error, id, ...props }) {
  const [visible, setVisible] = useState(false);

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
        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
        <input
          id={id}
          type={visible ? "text" : "password"}
          className={`w-full rounded-lg border bg-background px-3 py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-primary ${
            error ? "border-danger" : "border-border"
          }`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          tabIndex={-1}
        >
          {visible ? (
            <EyeOff className="h-4.5 w-4.5" />
          ) : (
            <Eye className="h-4.5 w-4.5" />
          )}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}
