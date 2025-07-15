// app/dashboard/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// shape of each purchase item
interface Purchase {
  courseId: string | null;
  courseTitle?: string;
  courseImage?: string;
  sessionId: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch("/api/purchases");
        if (!res.ok) return;
        const data = await res.json();
        setPurchases(data); // set fetched purchases in state
      } catch (error) {
        console.error("Failed to fetch purchases:", error);
      }
    };

    fetchPurchases(); // fetch on page load
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">👤 My Profile</h1>

      <h2 className="text-lg font-semibold mb-3">🎓 My Purchased Courses</h2>

      {purchases.length === 0 ? (
        <p className="text-gray-500">You haven’t purchased any courses yet.</p>
      ) : (
        <ul className="space-y-4">
          {purchases.map((purchase, idx) => (
            <li
              key={idx}
              className="border border-gray-200 rounded p-4 shadow-sm flex gap-4"
            >
              {/* show course image if available, else fallback box */}
              {purchase.courseImage ? (
                <Image
                  src={purchase.courseImage}
                  alt={purchase.courseTitle || "Course"}
                  width={96}
                  height={64}
                  className="rounded object-cover"
                />
              ) : (
                <div className="w-24 h-16 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-400">
                  no image
                </div>
              )}

              {/* show course title, purchase date, and stripe session id */}
              <div>
                <p className="font-semibold">
                  {purchase.courseTitle || `Course ID: ${purchase.courseId}`}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Purchased on:</strong>{" "}
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Session ID:</strong> {purchase.sessionId}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
