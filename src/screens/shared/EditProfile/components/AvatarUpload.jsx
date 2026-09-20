"use client";

import { Camera } from "lucide-react";

export default function AvatarUpload({ preview, name, onChange }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="flex justify-center pb-2">
      <label className="group relative cursor-pointer">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-primary/10 text-2xl font-bold text-primary shadow-md transition-transform duration-200 group-hover:scale-105">
          {preview ? (
            <img
              src={preview}
              alt="Avatar preview"
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Camera className="h-6 w-6 text-white" />
          <span className="mt-1 text-[10px] font-medium text-white/90">
            Change
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
