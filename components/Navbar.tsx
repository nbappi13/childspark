"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { LayoutDashboard } from "lucide-react"; // lucide dashboard icon

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <TooltipProvider>
      <nav className="flex items-center justify-between px-6 py-4 shadow-sm border-b bg-white">
        {/* left: logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          ChildSpark
        </Link>

        {/* center: navigation links */}
        <div className="flex-1 flex justify-center gap-8">
          <Link
            href="/courses"
            className="text-sm font-medium hover:text-primary transition"
          >
            COURSES
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition"
          >
            ABOUT US
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Contact
          </Link>
        </div>

        {/* right: dashboard icon & auth buttons */}
        <div className="flex items-center gap-6">
          {/* dashboard icon with tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/dashboard" className="hover:opacity-80">
                <LayoutDashboard size={36} className="text-blue-600" />{" "}
                {/* large dashboard icon */}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Dashboard</p>
            </TooltipContent>
          </Tooltip>

          {/* auth button */}
          {session ? (
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </Button>
          ) : (
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login with Google
            </Button>
          )}
        </div>
      </nav>
    </TooltipProvider>
  );
}
