// components/CourseCard.tsx

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Course } from "@/types/course";

export default function CourseCard({ course }: { course: Course })  {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition p-4">
      <Image
        src={course.image}
        alt={course.title}
        width={400}
        height={240}
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="mt-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">
          {course.title}
        </h2>
        <p className="text-sm text-gray-600">{course.description}</p>
        <p className="text-md font-medium text-green-700">${course.price}</p>

        <button
          onClick={() => router.push(`/courses/${course._id}`)}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
