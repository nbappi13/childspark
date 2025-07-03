import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Tailwind is working!</h1>
      <p className="mt-4 text-gray-700">  ok all done! </p>
      <Button variant="default">Click Me</Button>
    </main>
  );
}
