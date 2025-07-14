import Image from "next/image";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      quote:
        "SmartParentsHC helped me connect better with my teenage son. The parenting strategies are practical and actually work!",
      avatar: "https://i.imgur.com/UtBNIK7.jpg"
    },
    {
      name: "Sofia Johnson",
      quote:
        "The course on digital safety gave my daughter the confidence to explore the web safely. Highly recommended!",
      avatar: "https://i.imgur.com/kHyisQ3.jpg"
    },
    {
      name: "Kate Thompson",
      quote:
        "I'm a first-time mom, and this platform gave me peace of mind. I feel more confident every day.",
      avatar: "https://i.imgur.com/lA4wfig.jpg"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Testimonial</h2>
        <p className="text-lg text-gray-600 mb-12">
          Stories of Success from Our Learners
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={64} 
                height={64}
                className="w-16 h-16 rounded-full mx-auto"
              />
              <p className="text-gray-700 italic mb-3">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <h4 className="font-semibold text-indigo-600">
                {testimonial.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
