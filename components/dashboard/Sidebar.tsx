// components/dashboard/Sidebar.tsx

"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Sidebar() {
  const { data: session, status, update } = useSession()
  const [hasUpdated, setHasUpdated] = useState(false)

  // Force session update when component mounts 
  useEffect(() => {
    const updateSession = async () => {
      if (status === "authenticated" && !hasUpdated) {
        setHasUpdated(true)
        try {
          await update() // Refresh session to get latest role from server
        } catch (error) {
          console.error("Session update failed:", error)
        }
      }
    }

    const timer = setTimeout(updateSession, 100)
    return () => clearTimeout(timer)
  }, [status, update, hasUpdated])

  // Show loading state while session is being fetched
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
    )
  }

  const role = session?.user?.role || "user"
  const isAdmin = role === "admin"

  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <nav className="space-y-2">
        <Link href="/dashboard" className="block hover:underline">
          Home
        </Link>

        <Link href="/dashboard/profile" className="block hover:underline">
          Profile
        </Link>

        {/* Admin Panel link - always visible but conditionally disabled */}
        {isAdmin ? (
          // Active link for admin users
          <Link href="/dashboard/admin" className="block text-red-400 hover:underline font-bold">
            🛠 Admin Panel
          </Link>
        ) : (
          // Disabled link for regular users
          <div className="block text-gray-500 cursor-not-allowed font-bold relative group">
            🔒 Admin Panel
            <span className="text-xs text-gray-400 block">Admin access required</span>
            {/* Tooltip on hover */}
            <div className="absolute left-full ml-2 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              You need admin privileges to access this
            </div>
          </div>
        )}
      </nav>
    </aside>
  )
}
