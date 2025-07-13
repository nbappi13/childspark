// components/CourseCard.tsx

"use client";

import { Course } from "@/types/course";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";

// initialize Stripe with public key from environment variables
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CourseCard({ course }: { course: Course }) {
  // get current user session
  const { data: session } = useSession();
 
  const router = useRouter();

  // handles course enrollment logic
  const handleEnroll = async () => {
    // redirect to login if user is not authenticated
    if (!session) {
      router.push("/login");
      return;
    }

    // prevent admin users from enrolling
    if (session.user.role === "admin") {
      toast.info("You're an admin. Enrollment is disabled.");
      return;
    }

    try {
      // create stripe checkout session via API
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course._id }), // send course ID to backend
      });

      const data = await res.json();

      // if session created, redirect to Stripe checkout
      if (data.id) {
        const stripe = await stripePromise;
        stripe?.redirectToCheckout({ sessionId: data.id });
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (err) {
      // handle errors during checkout
      console.error("Checkout error", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    // card container for course details
    <div className="border rounded-xl shadow p-4 flex flex-col justify-between">
      {/* course image */}
      <Image
        src={course.image}
        alt={course.title}
        width={500}
        height={300}
        className="rounded-lg object-cover w-full h-48"
      />
      <div className="mt-4 space-y-2">
       
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
      
        <p className="text-sm text-gray-600">{course.description}</p>
        
        <p className="font-bold text-indigo-600">${course.price}</p>
        
        <button
          onClick={handleEnroll}
          className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
