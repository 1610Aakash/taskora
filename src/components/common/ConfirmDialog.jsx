"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = 'Confirm', cancelLabel = 'Cancel' }) {
  return (
    <AnimatePresence>
      {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.96 }} className="surface w-full max-w-sm rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4"><h3 className="text-lg font-semibold text-foreground">{title}</h3><button onClick={onCancel} aria-label="Close dialog" className="text-muted hover:text-foreground"><X className="h-4 w-4" /></button></div>
          {message && <p className="mt-2 text-sm leading-6 text-muted">{message}</p>}
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onCancel} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card-elevated">{cancelLabel}</button>
            <button onClick={onConfirm} className="rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-danger/80">{confirmLabel}</button>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
}
