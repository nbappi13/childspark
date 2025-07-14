// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">📩 Contact Us</h1>

      <p className="mb-4 text-gray-700 text-center">
        Have a question, feedback, or partnership idea? We’d love to hear from you.
      </p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Your Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg shadow-sm outline-none focus:ring focus:border-blue-400"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg shadow-sm outline-none focus:ring focus:border-blue-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Message</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border rounded-lg shadow-sm outline-none focus:ring focus:border-blue-400"
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
