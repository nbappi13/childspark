// app/api/save-purchase/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// create stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  // check user session
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // get session id from request
  const { sessionId } = await req.json();

  try {
    // get checkout session from stripe
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    // get course id from metadata
    const courseId = stripeSession.metadata?.courseId;

    // connect to database
    const client = await clientPromise;
    const db = client.db("test");

    // save purchase to db
    await db.collection("purchases").insertOne({
      email: session.user.email,
      courseId,
      sessionId,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save purchase:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
