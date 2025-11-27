"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function AddBookPage() {
  const router = useRouter();
  const { token, isLibrarian } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    categoryId: "1",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Use the token for authorization
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await api.post("/books/add", formData, config);
      setMessage("Book added successfully!");
      // Optional: Redirect back to dashboard after short delay
      setTimeout(() => router.push("/admin"), 1500);
    } catch (err) {
      console.error("Failed to add book", err);
      setMessage("Failed to add book. Are you logged in as Librarian?");
    } finally {
      setLoading(false);
    }
  };

  if (!isLibrarian) {
    return <div className="p-12 text-center">Access Denied.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Add New Book</h1>

        {message && (
          <div
            className={`p-4 mb-4 rounded ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-3 py-2 border rounded-lg text-black"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Author</label>
            <input
              type="text"
              name="author"
              required
              className="w-full px-3 py-2 border rounded-lg text-black"
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Category ID
            </label>
            <input
              type="number"
              name="categoryId"
              required
              className="w-full px-3 py-2 border rounded-lg text-black"
              value={formData.categoryId}
              onChange={handleChange}
              placeholder="1 for Fiction, 2 for Science..."
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Saving..." : "Save Book"}
            </button>
            <Link
              href="/admin"
              className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
