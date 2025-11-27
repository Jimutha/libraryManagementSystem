"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { Book } from "@/types";

export default function BookDetailsPage() {
  const { id } = useParams(); // Get the ID from the URL (e.g., "1")
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Call backend: GET /api/v1/books/{id}
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error("Failed to fetch book", err);
        setError("Book not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  if (loading)
    return <div className="text-center p-12 text-xl">Loading details...</div>;
  if (error || !book)
    return (
      <div className="text-center p-12 text-red-500 text-xl">
        {error || "Book not found"}
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 text-black p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-2xl">
        <Link
          href="/"
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          &larr; Back to Library
        </Link>

        <h1 className="text-4xl font-bold mb-4 text-gray-900">{book.title}</h1>

        <div className="space-y-4 text-lg text-gray-700">
          <p>
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p>
            <span className="font-semibold">Category:</span>{" "}
            {book.category?.name || "Uncategorized"}
          </p>

          <p className="text-gray-500 italic mt-6 border-t pt-4">
            &ldquo;A fantastic book waiting to be read.&rdquo;
          </p>
        </div>

        <button className="mt-8 w-full bg-green-600 text-white text-xl font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg">
          Reserve This Book
        </button>
      </div>
    </main>
  );
}
