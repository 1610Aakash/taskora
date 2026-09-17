"use client";

import { Camera } from "lucide-react";

export default function AvatarUpload({ preview, name, onChange }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="flex justify-center">
      <label className="group relative cursor-pointer">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary text-xl font-semibold text-primary-foreground">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Avatar preview" className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <Camera className="h-5 w-5 text-white" />
        </div>
        <input type="file" accept="image/*" onChange={onChange} className="hidden" />
      </label>
    </div>
  );
}