
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

const client = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = client.connect();
export default clientPromise;

import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // fetched user role from MongoDB and added to JWT token
    async jwt({ token }) {
      try {
        const client = await clientPromise;
        const db = client.db("test"); //  database name

        const userInDb = await db.collection("users").findOne({
          email: token.email,
        });

        if (userInDb) {
          token.role = userInDb.role || "user";
        } else {
          token.role = "user";
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        token.role = "user"; //for security purpose
      }

      return token;
    },

    // add role from JWT token to session object
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as string) || "user";
      }
      return session;
    },
  },
};
