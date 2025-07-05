// app/dashboard/layout.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar"; // sidebar for dashboard layout

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions); // check if user is logged in

  if (!session) {
    redirect("/login"); // if not logged in, go to login page
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* show left sidebar */}
      <main className="flex-1 p-6">{children}</main> {/* main page content */}
    </div>
  );
}
