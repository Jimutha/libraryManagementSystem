"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  // Get authentication state from our context
  const { user, isAuthenticated, isLibrarian } = useAuth();
  const router = useRouter();

  // Protect the route: Only allow Librarians
  useEffect(() => {
    // 1. If not logged in at all, go to login page
    if (!isAuthenticated) {
      // We use a small timeout to ensure auth state has finished loading
      const timer = setTimeout(() => {
        // Double check local storage directly as a fallback
        if (!localStorage.getItem("token")) router.push("/login");
      }, 100);
      return () => clearTimeout(timer);
    }

    // 2. If logged in but NOT a librarian, kick them to the home page
    if (isAuthenticated && !isLibrarian) {
      console.warn("Access Denied: User is not a librarian");
      router.push("/");
    }
  }, [isAuthenticated, isLibrarian, router]);

  // Show a loading state while we check permissions
  if (!isAuthenticated || !isLibrarian) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600 animate-pulse">
          Checking access permissions...
        </p>
      </div>
    );
  }

  // Render the Dashboard for Librarians only
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-900">
            Librarian Dashboard
          </h1>
          <button
            onClick={() => router.push("/")}
            className="text-gray-600 hover:text-gray-900 underline"
          >
            Back to Home
          </button>
        </div>

        {/* Welcome Card */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-black">
            Welcome back, {user?.sub}
          </h2>
          <p className="text-gray-600">
            You have full administrative access to the library system. Use the
            tools below to manage the catalog and users.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Book Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
              +
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Add New Book
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Add new titles to the library catalog.
            </p>
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Add Book
            </button>
          </div>

          {/* Manage Users Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
              U
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Manage Users
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              View users and manage blacklist status.
            </p>
            <button className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition">
              View Users
            </button>
          </div>

          {/* Reservations Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
              R
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Reservations
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Track active book reservations and due dates.
            </p>
            <button className="w-full py-2 px-4 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
              See All
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
