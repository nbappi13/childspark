import { Suspense } from "react";
import SuccessContent from "@/components/SuccessContent";

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto py-16 text-center">
      <Suspense fallback={<div>Loading payment confirmation...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
