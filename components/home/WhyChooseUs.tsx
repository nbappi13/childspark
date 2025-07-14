//components/home/WhyChooseUs.tsx

import { CheckCircle, Users, Lightbulb, ShieldCheck } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Personalized Mentorship",
    icon: <Users className="w-7 h-7 text-blue-600" />,
    desc: "Expert guidance tailored to each family's unique educational journey and parenting style. Our mentors work closely with you to understand your goals and challenges, ensuring every step is meaningful and effective.",
  },
  {
    title: "Real-Life Solutions",
    icon: <Lightbulb className="w-7 h-7 text-yellow-500" />,
    desc: "We deliver practical strategies parents can use immediately in both study and tech-related challenges. From homework help to managing screen time, our solutions are designed for real families.",
  },
  {
    title: "Trusted by Families",
    icon: <CheckCircle className="w-7 h-7 text-green-600" />,
    desc: "Our platform is loved by parents who seek support, clarity, and confidence in raising children. Join a community that values trust, transparency, and proven results.",
  },
  {
    title: "Digital Safety First",
    icon: <ShieldCheck className="w-7 h-7 text-purple-600" />,
    desc: "We educate both parents and children about cyber threats and help build smart digital habits. Stay ahead with our up-to-date resources and expert advice on digital safety.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="p-8 bg-gradient-to-br from-blue-50 via-green-50 to-purple-100 rounded-2xl shadow space-y-8">
      {/* section header */}
      <div className="text-center">
        <h1 className="text-2xl font-normal text-gray-800">WHY CHOOSE US</h1>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
          Unwavering commitment to quality
        </h2>
      </div>

      {/* content layout */}
      <div className="flex flex-col md:flex-row items-center gap-14 mt-8">
        {/* cards */}
        <div className="flex-1 grid grid-cols-1 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-5 bg-white/80 p-8 min-h-[180px] rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-200 via-green-100 to-purple-200 shadow group-hover:scale-105 transition">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* right image */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/why-choose.webp"
            alt="Why Choose Us"
            width={500}
            height={340} 
            className="rounded-3xl shadow-xl object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
