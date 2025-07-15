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
import { LayoutDashboard, Bot, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSmartAIStore } from "@/store/useSmartAIStore";

export default function Navbar() {
  const { data: session } = useSession();
  const { toggle } = useSmartAIStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <TooltipProvider>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* left: logo + site name */}
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <span className="text-3xl">👨‍👩‍👧</span>
              <span>SmartParentsHC</span>
            </Link>

            {/*  middle: desktop nav links */}
            <div className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="/courses" className="hover:text-yellow-300 transition">
                COURSES
              </Link>
              <Link href="/about" className="hover:text-yellow-300 transition">
                ABOUT US
              </Link>
              <Link href="/contact" className="hover:text-yellow-300 transition">
                CONTACT
              </Link>
            </div>

            {/* right section */}
            <div className="flex items-center gap-4">
              {/* dashboard icon */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/dashboard" className="hover:opacity-80">
                    <LayoutDashboard size={26} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>

              {/* SmartAI icon */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={toggle}>
                    <Bot size={24} className="hover:text-yellow-300 transition" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>SmartAI</p>
                </TooltipContent>
              </Tooltip>

              {/* desktop-only auth button */}
              <div className="hidden md:block">
                {session ? (
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-blue-600"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                  >
                    Login with Google
                  </Button>
                )}
              </div>

              {/* hamburger for mobile */}
              <button
                className="md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* mobile menu */}
          {menuOpen && (
            <div className="md:hidden bg-blue-500 px-4 pb-4 flex flex-col gap-3 text-sm font-medium text-white transition-all">
              <Link
                href="/courses"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300"
              >
                COURSES
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300"
              >
                ABOUT US
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300"
              >
                CONTACT
              </Link>

              {/* mobile-only auth button */}
              {session ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-orange-400 border-white hover:bg-white hover:text-blue-600 mt-2"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    signIn("google", { callbackUrl: "/" });
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black mt-2"
                >
                  Login with Google
                </Button>
              )}
            </div>
          )}
        </div>
      </nav>
    </TooltipProvider>
  );
}
