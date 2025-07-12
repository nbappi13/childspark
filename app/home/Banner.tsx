import { Button } from '@/components/ui/button';
import Image from 'next/image';


export default function Banner() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gray-100 rounded-2xl shadow-md">
      {/* left side content */}
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-6xl font-extrabold text-gray-800">
          A Journey of Growth: Empowering Yourself & Your Child
        </h1>
        <p className="text-gray-600 text-lg">
          Join us in unlocking tools, support, and strategies to help both you and your child thrive.
          A path to mindful parenting starts here.
        </p>
        <Button className="text-sm">Enroll</Button>
      </div>

      {/* right side image */}
      <div className="flex-1">
        <Image
          src="/mother.child.webp"
          alt="parent and child"
          width={600}
          height={400}
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
