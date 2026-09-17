export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = 'Confirm', cancelLabel = 'Cancel' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full mx-4">
        <h3 className="text-foreground font-bold text-lg mb-2">{title}</h3>
        {message && <p className="text-muted text-sm mb-6">{message}</p>}
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-border text-secondary-text hover:bg-card-elevated text-sm transition-colors">{cancelLabel}</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-danger hover:opacity-90 text-white text-sm font-medium transition-colors">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
