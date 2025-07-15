import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { MongoClient, ObjectId } from "mongodb"
import Link from "next/link"
import DeleteButton from "@/components/admin/DeleteButton" 

// course type
type Course = {
  _id: ObjectId
  title: string
  description: string
  price: number
  image: string
}

export default async function AdminCoursesPage() {
  const session = await getServerSession(authOptions)

  // protect route
  if (!session) redirect("/login")
  if (session.user.role !== "admin") redirect("/dashboard")

  // connect to mongodb and get all courses
  const client = await new MongoClient(process.env.MONGODB_URI!).connect()
  const db = client.db("test")
  const courses = (await db.collection("courses").find().toArray()) as Course[]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Manage Courses</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, i) => (
              <tr key={course._id.toString()} className="hover:bg-gray-50">
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2">{course.title}</td>
                <td className="border p-2">${course.price}</td>
                <td className="border p-2 space-x-2">
                  {/* edit course link */}
                  <Link
                    href={`/dashboard/admin/courses/edit/${course._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  {/* delete course button */}
                  <DeleteButton courseId={course._id.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
