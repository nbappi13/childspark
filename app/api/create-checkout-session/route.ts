// app/api/create-checkout-session/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCourses } from "@/lib/db"; 
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json(); // expects { courseId }
    const { courseId } = body;

    // get all courses 
    const courses = await getCourses();
    const course = courses.find((c) => c._id === courseId);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description,
              images: [course.image],
            },
            unit_amount: parseInt(course.price) * 100, // in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${headers().get("origin")}/success`,
      cancel_url: `${headers().get("origin")}/courses`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
