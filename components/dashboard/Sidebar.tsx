"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // 

export default function Sidebar() {
  const { data: session, status, update } = useSession();
  const [hasUpdated, setHasUpdated] = useState(false);
  const pathname = usePathname(); //  get current route

  // force session update when component mounts
  useEffect(() => {
    const updateSession = async () => {
      if (status === "authenticated" && !hasUpdated) {
        setHasUpdated(true);
        try {
          await update();
        } catch (error) {
          console.error("Session update failed:", error);
        }
      }
    };

    const timer = setTimeout(updateSession, 100);
    return () => clearTimeout(timer);
  }, [status, update, hasUpdated]);

  if (status === "loading") {
    return (
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
        </div>
      </aside>
    );
  }

  const role = session?.user?.role || "user";
  const isAdmin = role === "admin";

  return (
    <aside className="w-full sm:w-64 bg-gray-900 text-white p-4">
      
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <nav className="space-y-2">
        {/* home link - highlighted if path is exactly /dashboard */}
        <Link
          href="/dashboard"
          className={`block hover:underline ${
            pathname === "/dashboard" ? "text-orange-500 font-bold" : ""
          }`}
        >
          Home
        </Link>

        {/* profile link */}
        <Link
          href="/dashboard/profile"
          className={`block hover:underline ${
            pathname === "/dashboard/profile" ? "text-orange-500 font-bold" : ""
          }`}
        >
          Profile
        </Link>

        {/* admin panel link */}
        {isAdmin ? (
          <Link
            href="/dashboard/admin"
            className={`block hover:underline font-bold ${
              pathname?.startsWith("/dashboard/admin")
                ? "text-orange-500"
                : "text-white"
            }`}
          >
            🛠 Admin Panel
          </Link>
        ) : (
          <div className="block text-gray-500 cursor-not-allowed font-bold relative group">
            🔒 Admin Panel
            <span className="text-xs text-gray-400 block">
              Admin access required
            </span>
            <div className="absolute left-full ml-2 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              You need admin privileges to access this
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}
