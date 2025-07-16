"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function SuccessContent() {
  const rawSearchParams = useSearchParams();
  const [isSaving, setIsSaving] = useState(true);
  const hasSaved = useRef(false); // prevent double-saving

  useEffect(() => {
    if (!rawSearchParams || hasSaved.current) return;

    const sessionId = rawSearchParams.get("session_id"); // get session_id from URL

    if (!sessionId) {
      toast.error("Missing session ID");
      setIsSaving(false);
      return;
    }

    const savePurchase = async () => {
      try {
        await axios.post("/api/save-purchase", { sessionId }); // send to backend
        toast.success("Payment successful! Purchase saved.");
      } catch (error) {
        toast.error("Failed to save purchase.");
        console.error("Save purchase error:", error);
      } finally {
        setIsSaving(false);
      }
    };

    savePurchase();
    hasSaved.current = true; // mark as saved
  }, [rawSearchParams]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700">
        {isSaving ? "Processing your payment..." : "Thank you for enrolling!"}
      </p>
    </>
  );
}
