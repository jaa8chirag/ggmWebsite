"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({
  action,
  label = "item",
}: {
  action: () => Promise<void>;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete this ${label}? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        aria-label={`Delete ${label}`}
        className="rounded-lg p-2 text-muted transition-colors hover:bg-signal/10 hover:text-signal"
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}
