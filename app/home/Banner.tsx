import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"; 

export default function Banner() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between gap-10 p-10 rounded-3xl shadow-xl bg-gradient-to-r from-green-200 via-green-300 to-green-500 overflow-hidden">
      {/* decorative gradient circles */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-green-400 opacity-30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-600 opacity-20 rounded-full blur-3xl -z-10" />

      {/* left side content */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-lg">
          A Journey of Growth: <br />
          <span className="text-green-700">
            Empowering Yourself & Your Child
          </span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl font-medium">
          Join us in unlocking tools, support, and strategies to help both you
          and your child thrive.
          <br />
          <span className="text-green-900 font-semibold">
            A path to mindful parenting starts here.
          </span>
        </p>

        {/* wrapped button with Link */}
        <Link href="/courses">
          <Button className="text-base px-6 py-3 mt-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition">
            Explore Now
          </Button>
        </Link>
      </div>

      {/* right side image */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white/80 rounded-2xl shadow-2xl p-4">
          <Image
            src="/mother.child.webp"
            alt="parent and child"
            width={400}
            height={400}
            className="w-full h-auto rounded-xl object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
