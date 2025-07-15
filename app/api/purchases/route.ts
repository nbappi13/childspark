// app/api/purchases/route.ts
// server route to fetch user's past purchases from database

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET() {
  // get the current logged-in user's session
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // connect to mongodb
  const client = await clientPromise;
  const db = client.db("test");

  // get all purchases by this user, sorted by latest
  const purchases = await db
    .collection("purchases")
    .find({ email: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  // extract course ids from purchases
  const courseIds = purchases
    .map((p) => p.courseId)
    .filter((id): id is string => Boolean(id)); // remove nulls

  // fetch course details (title, image) for those course ids
  const courses = await db
    .collection("courses")
    .find({ _id: { $in: courseIds.map((id) => new ObjectId(id)) } })
    .toArray();

  // create a quick lookup for course info by id
  const courseMap = new Map(
    courses.map((c) => [c._id.toString(), { title: c.title, image: c.image }])
  );

  // build final response with purchase and course info
  const result = purchases.map((p) => ({
    courseId: p.courseId || null,
    courseTitle: p.courseId ? courseMap.get(p.courseId)?.title || "Unknown Course" : null,
    courseImage: p.courseId ? courseMap.get(p.courseId)?.image || null : null,
    sessionId: p.sessionId,
    createdAt: p.createdAt,
  }));

  return NextResponse.json(result);
}
