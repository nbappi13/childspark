import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

export async function POST(req: Request) {
  const formData = await req.formData()
  const id = formData.get("id") as string

  // check id exists
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 })
  }

  try {
    // connect to mongodb
    const client = await new MongoClient(process.env.MONGODB_URI!).connect()
    const db = client.db("test")

    // delete course by id
    await db.collection("courses").deleteOne({ _id: new ObjectId(id) })

    return NextResponse.redirect(new URL("/dashboard/admin/courses", req.url))
  } catch (err) {
    console.error("Error deleting course:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
