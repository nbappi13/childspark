// app/api/create-checkout-session/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCourses } from "@/lib/db";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // init stripe

export async function POST(req: Request) {
  try {
    const body = await req.json(); // get courseId from request
    const { courseId } = body;

    // get all courses from db
    const courses = await getCourses();
    const course = courses.find((c) => c._id === courseId); // find course

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const origin = headers().get("origin"); // get site url

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
            unit_amount: parseInt(course.price) * 100, // price in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/courses`,

      //  include courseId in metadata
      metadata: {
        courseId: course._id,
      },
    });

    return NextResponse.json({ id: session.id }); // return session id
  } catch (err) {
    console.error("Stripe error:", err); // log error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
