// lib/auth.ts

import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb"; 

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise), // use MongoDB as database
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // from .env file
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login", // custom login page
  },
  session: {
    strategy: "jwt", // use JWT for session (future need)
  },
  secret: process.env.NEXTAUTH_SECRET, // secret key for NextAuth
};
