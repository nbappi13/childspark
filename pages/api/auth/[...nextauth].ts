//pages/api/auth/[...nextauth.ts]

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "@/lib/mongodb"; // Removed to avoid conflict
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // Using JWT strategy for session management
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    // JWT callback: Runs when JWT is created/updated - fetches user role from MongoDB
    async jwt({ token }) {
      try {
        const client = await clientPromise;
        const db = client.db("test"); // Your MongoDB database name

        // Find user in MongoDB by email to get their role
        const userInDb = await db.collection("users").findOne({
          email: token.email,
        });

        // Set role from database or default to 'user'
        if (userInDb) {
          token.role = userInDb.role || "user";
        } else {
          token.role = "user";
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        token.role = "user"; // Fallback to user role on error
      }

      return token;
    },

    // Session callback: Adds role from JWT token to session object
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as string) || "user";
      }
      return session;
    },
  },
});

export default handler;
