// app/dashboard/profile/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image"; 

export default async function ProfilePage() {
  const session = await getServerSession(authOptions); // get user session

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      {/* Show user info */}
      <div className="space-y-2">
        <p><span className="font-semibold">Name:</span> {session?.user?.name}</p>
        <p><span className="font-semibold">Email:</span> {session?.user?.email}</p>

        {/* image */}
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full border mt-4"
          />
        )}
      </div>
    </div>
  );
}
