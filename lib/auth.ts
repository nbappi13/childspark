import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb";
import type { NextAuthOptions } from "next-auth";

// Main NextAuth configuration
export const authOptions: NextAuthOptions = {
  // Adapter to connect NextAuth to MongoDB (without Prisma)
  adapter: MongoDBAdapter(clientPromise),

  // Define which providers users can log in with
  providers: [
    // Google OAuth login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Email/password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TODO: Add your own logic here (e.g. DB lookup)
        const user = {
          id: "user-id-123",
          name: "Test User",
          email: credentials?.email,
        };

        if (user) return user;
        return null;
      },
    }),
  ],

  // Customize pages (optional)
  pages: {
    signIn: "/login",       // Your custom login page
    newUser: "/register",   // Custom registration
  },

  session: {
    strategy: "jwt",         // Use JSON Web Tokens
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions);
