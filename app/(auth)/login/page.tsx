'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      {/* overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 bg-white/90 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Sign in to ChildSpark
        </h1>

        <Button
          variant="outline"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
