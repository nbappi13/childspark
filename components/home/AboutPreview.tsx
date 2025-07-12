import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPreview() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* main heading with decorative elements */}
      <div className="relative text-center mb-16">
        <h1 className="text-4xl md:text-3xl font-bold text-gray-800 relative z-10 inline-block">
          <span className="relative">
            ABOUT US
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
          </span>
        </h1>
        <div className="absolute -top-6 left-1/4 w-12 h-12 rounded-full bg-blue-100 opacity-70"></div>
        <div className="absolute -bottom-4 right-1/4 w-10 h-10 rounded-full bg-purple-100 opacity-70"></div>
      </div>

      <section className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl shadow-lg border border-gray-100">
        {/* left side image with unique circular design */}
        <div className="flex-1 relative max-w-md">
          {/* floating circular image with gradient border */}
          <div className="relative mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300 to-purple-400 blur-lg opacity-50 animate-pulse-slow"></div>
            <div className="relative rounded-full overflow-hidden border-8 border-white shadow-xl w-[300px] h-[300px] rotate-3 hover:rotate-0 transition-transform duration-700">
              <Image
                src="/parent and child.webp"
                alt="About Us"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* decorative shapes */}
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-blue-200 opacity-40 z-0"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-purple-200 opacity-40 z-0"></div>
          <div className="absolute top-1/3 -right-6 w-16 h-16 rotate-45 bg-yellow-100 opacity-30"></div>
        </div>

        {/* right side content */}
        <div className="flex-1 space-y-6 z-10">
          {/* title with gradient */}
          <h2 className="text-3xl font-bold text-gray-800">
            Empowering <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Parents</span> in the Digital Age
          </h2>

          {/* short description */}
          <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-blue-200 pl-4 py-1">
            We help parents support their children learning journey—no matter their background, schedule, or tech skills.
          </p>

          {/* enhanced link list with icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[
              { 
                title: "Busy Schedule, Big Dreams", 
                icon: "⏱️",
                color: "from-blue-400 to-blue-500"
              },
              { 
                title: "Bridging the Study Gap", 
                icon: "🌉",
                color: "from-purple-400 to-purple-500"
              },
              { 
                title: "Raising Digitally Smart Kids", 
                icon: "💡",
                color: "from-indigo-400 to-indigo-500"
              },
              { 
                title: "Guiding Through the Pressure", 
                icon: "🛡️",
                color: "from-teal-400 to-teal-500"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <span className={`text-lg p-2 rounded-lg bg-gradient-to-br ${item.color} text-white`}>
                  {item.icon}
                </span>
                <span className="font-medium text-gray-700">{item.title}</span>
              </div>
            ))}
          </div>

          {/* enhanced button */}
          <Link href="/about" className="inline-block mt-6">
            <Button className="relative overflow-hidden group px-8 py-6 text-md font-bold">
              <span className="relative z-10">Explore About Us</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition-all"></span>
              <span className="absolute top-0 left-0 w-full h-0.5 bg-white animate-progress group-hover:animate-none"></span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}