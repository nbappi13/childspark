import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="space-y-6 p-6 bg-gray-50 rounded-2xl shadow-sm">
      {/* about us heading */}
      <h1 className="text-3xl font-bold text-gray-800 text-center">ABOUT US</h1>

      {/* image + content side by side */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* left side image with stylish shape */}
        <div className="flex-1 relative w-full max-w-md">
          <div className="overflow-hidden rounded-[60px] shadow-md transform scale-105">
            <Image
              src="/parent and child.webp"
              alt="About Us"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* right side content */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Empowering Parents in the Digital Age
          </h2>

          <p className="text-gray-600">
            We help parents support their children learning—no matter their background, schedule, or tech skills.
          </p>

          {/* not clickable list */}
          <ul className="text-sm text-gray-500 list-disc pl-4 space-y-1">
            <li>Busy Schedule, Big Dreams</li>
            <li>Bridging the Study Gap</li>
            <li>Raising Digitally Smart Kids</li>
            <li>Guiding Through the Pressure</li>
          </ul>

          {/* explore button */}
          <Link href="/about">
            <Button className="text-sm mt-2">Explore About Us</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
