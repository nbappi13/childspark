"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // simulate successful submission (fake)
    alert("✅ Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">📩 Contact Us</h1>

      <p className="mb-4 text-gray-700 text-center">
        Have a question, feedback, or idea? We’d love to hear from you.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-600">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm outline-none focus:ring focus:border-blue-400"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm outline-none focus:ring focus:border-blue-400"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg shadow-sm outline-none focus:ring focus:border-blue-400"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        📧 Or email us directly at{" "}
        <a
          href="mailto:support@smartparentshc.com"
          className="text-blue-600 hover:underline"
        >
          support@smartparentshccc.com
        </a>
      </p>
    </div>
  );
}
