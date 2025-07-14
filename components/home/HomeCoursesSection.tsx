// components/home/HomeCoursesSection.tsx

import { getCourses } from "@/lib/db";
import CourseCard from "@/components/CourseCard";

export default async function HomeCoursesSection() {
  // fetch all courses
  const allCourses = await getCourses();
  // take first 3 only
  const topThree = allCourses.slice(0, 3);

  return (
    <section className="bg-zinc-100">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">OUR COURSES</h2>
        <p className="text-lg text-gray-600">
          Tailored courses for every stage of learning
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
        {topThree.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      <div className="text-center">
        <a
          href="/courses"
          className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-orange-500 transition"
        >
          See more
        </a>
      </div>
    </div>
    </section>
  );
}
