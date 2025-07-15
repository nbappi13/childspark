import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // redirect to login if not authenticated
  if (!session) {
    redirect("/login")
  }

  // redirect to dashboard if not admin - server-side protection
  if (session?.user?.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-green-600">Admin Dashboard</h1>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Welcome, Admin!</h2>
        <p className="mb-4">This is admin panel.</p>

        <div className="bg-white p-4 rounded border">
          <h3 className="font-semibold mb-2">Your Details:</h3>
          <p>
            <strong>Name:</strong> {session.user.name}
          </p>
          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span className="text-green-600 font-bold">{session.user.role}</span>
          </p>
        </div>

        {/* quick Links */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Quick Links:</h3>
          <ul className="list-disc list-inside text-blue-600 space-y-1">
            <li>
              <Link href="/dashboard/admin/users" className="hover:underline">
                👥 View All Users
              </Link>
            </li>
            <li>
              <Link href="/dashboard/admin/orders" className="hover:underline">
                👥 View All Orders
              </Link>
            </li>
            <li>
              <Link href="/dashboard/admin/courses" className="hover:underline">
                👥 Course Management
              </Link>
            </li>
            
            {/* have add more links here later */}
          </ul>
        </div>
      </div>
    </div>
  )
}
