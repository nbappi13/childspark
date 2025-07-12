import Image from "next/image";

export default function AboutPage() {
  const sections = [
    {
      title: "Busy Schedule, Big Dreams",
      description:
        "Many parents want to help their children succeed, but busy schedules or work pressure make it difficult to provide consistent support. We understand the challenges of juggling career, household responsibilities, and parenting. Our platform offers flexible learning tools that fit into your schedule, with bite-sized lessons and progress tracking that let you contribute meaningfully to your child's education, even with limited time.",
      icon: "⏱️",
      color: "bg-gradient-to-br from-blue-400 to-blue-500",
    },
    {
      title: "Bridging the Study Gap",
      description:
        "Not all parents are confident in today's education. A parent with an Arts background may struggle to help with STEM subjects, while others might feel outdated with modern teaching methods. Our platform bridges this gap by providing subject-specific guides, video tutorials, and AI-powered assistance. We break down complex concepts into parent-friendly explanations, empowering you to support your child's learning regardless of your own educational background.",
      icon: "🌉",
      color: "bg-gradient-to-br from-purple-400 to-purple-500",
    },
    {
      title: "Raising Digitally Smart Kids",
      description:
        "Some parents feel unsure about how to manage social media, online threats, or device usage while fostering digital literacy. In today's connected world, digital safety is as important as physical safety. Our comprehensive resources teach you how to set healthy boundaries, monitor online activity without invading privacy, and educate your children about cybersecurity. We provide tools to help your children become responsible digital citizens while protecting them from online risks.",
      icon: "💡",
      color: "bg-gradient-to-br from-indigo-400 to-indigo-500",
    },
    {
      title: "Guiding Through the Pressure",
      description:
        "Children today face intense study pressure from academics, extracurricular, and social expectations. This pressure can lead to anxiety, burnout, and diminished self-esteem. We offer tools and mentoring to help parents recognize signs of stress and implement effective coping strategies. Our approach focuses on building resilience, maintaining open communication, and creating a balanced environment where children can thrive academically while preserving their mental health.",
      icon: "🛡️",
      color: "bg-gradient-to-br from-teal-400 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Our Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering parents to become confident partners in their children
            educational journey through innovative tools and supportive
            resources.
          </p>
        </div>

        {/* image section */}
        <div className="mb-16 flex justify-center">
          <div className="relative w-full max-w-3xl aspect-[16/7] rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-blue-50 to-indigo-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <Image
              src="/parent and child.webp"
              alt="About Us"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>
        </div>

        {/* introduction */}
        <div className="bg-white p-8 rounded-3xl shadow-md mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Empowering{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Parents
            </span>{" "}
            in the Digital Age
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            We help parents support their children learning journey—no matter
            their background, schedule, or tech skills. Our platform was born
            from a simple observation: millions of parents want to be more
            involved in their children education but face barriers that prevent
            meaningful engagement.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            By combining educational expertise with intuitive technology, we
            have created a comprehensive ecosystem where parents can find the
            tools, knowledge, and community they need to help their children
            thrive academically and emotionally.
          </p>
        </div>

        {/* feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl bg-white`}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div
                    className={`${section.color} w-14 h-14 rounded-lg flex items-center justify-center text-white text-xl`}
                  >
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 ml-4">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-600 text-lg flex-grow">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* call to action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Parenting Journey?
          </h3>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of parents who are already empowering their children
            learning and development.
          </p>
          <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-all shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}
