// app/success/page.tsx

export default function SuccessPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-700">Payment Successful!</h1>
        <p className="text-gray-600">Thank you for enrolling. You will receive confirmation shortly.</p>
      </div>
    </main>
  );
}
