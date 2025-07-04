'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Sign in to ChildSpark</h1>

      <Button
        variant="outline"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        Sign in with Google
      </Button>
    </div>
  );
}
