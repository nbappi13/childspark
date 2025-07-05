// components/Navbar.tsx

"use client"; // because we need access to session + signOut

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full p-4 bg-gray-100 flex justify-between">
      <Link href="/" className="font-bold text-lg">
        ChildSpark
      </Link>

      <div>
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
}
