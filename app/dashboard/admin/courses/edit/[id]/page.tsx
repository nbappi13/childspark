import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { MongoClient, ObjectId } from "mongodb"

export default async function EditCoursePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // check admin access
  if (!session || session.user.role !== "admin") {
    redirect("/dashboard")
  }

  // get course by id
  const client = await new MongoClient(process.env.MONGODB_URI!).connect()
  const db = client.db("test")
  const course = await db.collection("courses").findOne({ _id: new ObjectId(params.id) })

  if (!course) {
    return <div>❌ Course not found</div>
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-purple-600">Edit Course</h1>

      {/* edit form */}
      <form action="/dashboard/admin/courses/update" method="POST" className="space-y-4">
        <input type="hidden" name="id" value={course._id.toString()} />

        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={course.title}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={course.description}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            defaultValue={course.price}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={course.image}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Update Course
        </button>
      </form>
    </div>
  )
}
