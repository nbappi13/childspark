// lib/db.ts

import clientPromise from "./mongodb";

export async function getCourses() {
  const client = await clientPromise;
  const db = client.db("test");
  const courses = await db.collection("courses").find({}).toArray();
  return courses;
}
