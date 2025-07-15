// app/dashboard/admin/orders/page.tsx

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { MongoClient, ObjectId } from "mongodb"

type Purchase = {
  _id: ObjectId
  email: string
  courseId?: string
  sessionId?: string
  createdAt?: Date
}

type Course = {
  _id: ObjectId
  title: string
}

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")
  if (session.user.role !== "admin") redirect("/dashboard")

  const client = await new MongoClient(process.env.MONGODB_URI!).connect()
  const db = client.db("test")

  // fetch purchases
  const purchases = (await db.collection("purchases").find().toArray()) as Purchase[]

  // extract courseIds from purchases (filter out undefined)
  const courseIds = purchases
    .map((p) => p.courseId)
    .filter((id): id is string => Boolean(id))
    .map((id) => new ObjectId(id))

  // fetch course data
  const courses = await db
    .collection("courses")
    .find({ _id: { $in: courseIds } })
    .toArray() as Course[]

  // create a map for quick course title lookup
  const courseMap = new Map(courses.map((c) => [c._id.toString(), c.title]))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-purple-600">All Purchases</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">User Email</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Session ID</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, i) => (
            <tr key={purchase._id.toString()} className="hover:bg-gray-50">
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{purchase.email}</td>
              <td className="border p-2">
                {purchase.courseId ? courseMap.get(purchase.courseId) || "Unknown Course" : "N/A"}
              </td>
              <td className="border p-2">{purchase.sessionId || "—"}</td>
              <td className="border p-2">
                {purchase.createdAt
                  ? new Date(purchase.createdAt).toLocaleDateString()
                  : purchase._id.getTimestamp().toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
