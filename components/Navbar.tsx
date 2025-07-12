"use client"; 

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full p-4 bg-gray-100 flex justify-between items-center">
      {/* left: brand and links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-lg">
          ChildSpark
        </Link>
        <Link href="/about" className="text-sm text-gray-700 hover:underline">
          About Us
        </Link>
      </div>

      {/* right: auth buttons */}
      <div>
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm"
          >
            logout
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
          >
            login with google
          </button>
        )}
      </div>
    </nav>
  );
}
