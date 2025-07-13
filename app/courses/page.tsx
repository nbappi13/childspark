// app/courses/page.tsx

import { getCourses } from "@/lib/db";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/course";

export default async function CoursesPage() {
  // get all the 10 courses from the database
  const courses = await getCourses(); 

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">OUR COURSES</h1>
        <p className="text-lg text-gray-600">
          Tailored courses for every stage of learning
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course._id.toString()} course={course as unknown as Course} />
        ))}
      </div>
    </main>
  );
}
