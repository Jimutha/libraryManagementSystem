"use client"; // Required for client-side fetching

import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import api from "@/lib/api";
import { Book } from "@/types";
import Link from "next/link"; // Import Link for navigation buttons
import { useAuth } from "@/context/AuthContext"; // Import auth hook

export default function Home() {
  const { isAuthenticated, logout, isLibrarian } = useAuth(); // Use auth state

  // State to hold the list of books from the backend
  const [books, setBooks] = useState<Book[]>([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState("");

  // This runs once when the page loads
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Call the Spring Boot endpoint: http://localhost:8081/api/v1/books/all
        const response = await api.get("/books/all");
        setBooks(response.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
        setError("Failed to load books. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading)
    return <div className="text-center p-12 text-xl">Loading library...</div>;
  if (error)
    return <div className="text-center p-12 text-red-500 text-xl">{error}</div>;

  return (
    <main className="min-h-screen bg-gray-50 text-black p-8 md:p-12">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-900 tracking-tight">
          Library Catalog
        </h1>
        <p className="text-xl text-gray-600">
          Discover your next favorite book from our collection.
        </p>

        {/* Dynamic Authentication Buttons */}
        <div className="mt-6 space-x-4 flex justify-center items-center">
          {isAuthenticated ? (
            <>
              {/* Only show this if user is a Librarian */}
              {isLibrarian && (
                <Link
                  href="/admin"
                  className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-purple-700 transition"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold shadow-md hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-800 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-900 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Book Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id} // IMPORTANT: Pass the ID so the link works
            title={book.title}
            author={book.author}
            // Safely handle category (it might be null or undefined)
            category={book.category?.name || "Uncategorized"}
          />
        ))}
      </div>
    </main>
  );
}
