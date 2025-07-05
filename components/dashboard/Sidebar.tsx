// components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <nav className="space-y-2">
        {/* rendered home */}
        <Link href="/dashboard" className="block hover:underline">
          Home
        </Link>
        {/* rendered Profile */}
        <Link href="/dashboard/profile" className="block hover:underline">
          Profile
        </Link>
        {/* Admin routes can be conditionally rendered later */}
      </nav>
    </aside>
  );
}
