import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="bg-[#0f1420] text-white flex min-h-screen flex-col items-center justify-center p-4 text-center font-sans">
        <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
        <p className="mt-2 text-sm text-gray-400">The requested page could not be found.</p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-[#fe911a] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0f1420] transition-colors hover:bg-[#0370ba] hover:text-white"
        >
          Return Home
        </Link>
      </body>
    </html>
  );
}
