"use client";

import { usePathname } from "next/navigation";

export default function AdminContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFullBleed = pathname === "/admin/leads";

  if (isFullBleed) {
    return (
      <main className="flex-1 min-w-0 h-full overflow-hidden flex flex-col">
        {children}
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto px-3.5 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 min-w-0">
      <div className="mx-auto max-w-[1280px] w-full min-w-0">{children}</div>
    </main>
  );
}
