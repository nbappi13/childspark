// lib/db.ts

import { Course } from "@/types/course";
import clientPromise from "./mongodb";

export async function getCourses(): Promise<Course[]> {
  const client = await clientPromise;
  const db = client.db("test");
  const courses = await db.collection("courses").find().toArray();

  return courses.map((course) => ({
    _id: course._id.toString(),
    title: course.title,
    description: course.description,
    image: course.image,
    price: course.price,
  }));
}

