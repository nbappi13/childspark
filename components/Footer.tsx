// components/Footer.tsx

import Link from "next/link";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6"; 

export default function Footer() {
  return (
    <footer className="bg-stone-300">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-700">
        {/* Left: logo and site name */}
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <FaGraduationCap className="text-xl text-indigo-600" />
          <span className="font-bold text-xl text-indigo-700">SmartParentsHC</span>
        </div>

        {/* Middle: Links */}
        <div className="space-x-6 mb-4 sm:mb-0">
          <Link href="/about" className="hover:underline text-slate-900 text-base">About Us</Link>
          <Link href="/contact" className="hover:underline text-slate-900 text-base">Contact</Link>
        </div>

        {/* Right: Social links */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
            aria-label="Twitter/X"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* bottom line and copyright */}
      <hr className="border-t border-gray-300 mt-4" />
      <div className="text-center text-xs text-gray-700 py-4">
        &copy; {new Date().getFullYear()} SmartParentsHC. All rights reserved.
      </div>
    </footer>
  );
}
