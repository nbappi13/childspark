import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { MongoClient, ObjectId } from "mongodb"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  // only admin allowed
  if (!session || session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // get form data
  const formData = await req.formData()
  const id = formData.get("id")?.toString()
  const title = formData.get("title")?.toString()
  const description = formData.get("description")?.toString()
  const price = parseFloat(formData.get("price")?.toString() || "0")
  const image = formData.get("image")?.toString()

  // check required fields
  if (!id || !title || !description || !image || isNaN(price)) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  try {
    // connect to mongodb
    const client = await new MongoClient(process.env.MONGODB_URI!).connect()
    const db = client.db("test")

    // update the course
    await db.collection("courses").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description,
          price,
          image,
        },
      }
    )

    return NextResponse.redirect(new URL("/dashboard/admin/courses", req.url))
  } catch (error) {
    console.error("Failed to update course:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
