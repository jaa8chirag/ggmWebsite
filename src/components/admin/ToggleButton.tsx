"use client";

export default function ToggleButton({
  action,
  enabled,
}: {
  action: () => Promise<void>;
  enabled: boolean;
}) {
  return (
    <form action={action}>
      <button
        type="submit"
        className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
          enabled
            ? "bg-flow/10 text-flow hover:bg-signal/10 hover:text-signal"
            : "border border-chalk/20 text-muted hover:border-flow hover:text-flow"
        }`}
      >
        {enabled ? "Published" : "Enable"}
      </button>
    </form>
  );
}
