// app/dashboard/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; //  auth config

export default async function DashboardPage() {
  const session = await getServerSession(authOptions); // get logged-in user session

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to the dashboard!</h1>
      <p>You are logged in as: {session?.user?.email}</p> {/* show user email */}
    </div>
  );
}
