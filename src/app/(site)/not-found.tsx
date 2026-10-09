import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-bold text-chalk">404 - Page Not Found</h1>
      <p className="mt-2 text-sm text-muted">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-signal px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-chalk hover:bg-flow"
      >
        Return Home
      </Link>
    </div>
  );
}
