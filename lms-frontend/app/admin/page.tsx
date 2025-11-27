"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link for navigation

export default function AdminDashboard() {
  const { user, isAuthenticated, isLibrarian, logout } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Protect the route
  useEffect(() => {
    // We use a small timeout to allow AuthContext to load from localStorage
    const timer = setTimeout(() => {
      setIsChecking(false);

      // 1. If not logged in at all -> Login Page
      if (!localStorage.getItem("token")) {
        router.push("/login");
        return;
      }

      // 2. If logged in but NOT a librarian -> Home Page
      // We check user?.role directly or rely on isLibrarian if it's ready
      if (user && user.role !== "LIBRARIAN") {
        alert("Access Denied: Librarians Only");
        router.push("/");
      }
    }, 500); // Small delay to prevent flickering

    return () => clearTimeout(timer);
  }, [user, router]);

  // Show loading state while checking permissions
  if (isChecking || !isAuthenticated || !isLibrarian) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600 animate-pulse">
          Verifying permissions...
        </p>
      </div>
    );
  }

  // If we passed the checks, show the dashboard
  return (
    <main className="min-h-screen bg-gray-50 text-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-900">
            Librarian Dashboard
          </h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Welcome, {user?.sub}
          </h2>
          <p className="text-gray-600 mb-8">
            You have full administrative access to the library system.
          </p>

          {/* Admin Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Action Card 1: Add New Book - NOW LINKED */}
            <Link href="/admin/add-book" className="block h-full">
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl hover:shadow-lg transition cursor-pointer group h-full">
                <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-900 mb-2">
                  + Add New Book
                </h3>
                <p className="text-sm text-blue-600/80">
                  Add new titles to the library catalog.
                </p>
              </div>
            </Link>

            {/* Action Card 2 */}
            <div className="p-6 bg-green-50 border border-green-100 rounded-xl hover:shadow-lg transition cursor-pointer group">
              <h3 className="text-xl font-bold text-green-700 group-hover:text-green-900 mb-2">
                Manage Users
              </h3>
              <p className="text-sm text-green-600/80">
                View members and handle blacklisting.
              </p>
            </div>

            {/* Action Card 3 */}
            <div className="p-6 bg-yellow-50 border border-yellow-100 rounded-xl hover:shadow-lg transition cursor-pointer group">
              <h3 className="text-xl font-bold text-yellow-700 group-hover:text-yellow-900 mb-2">
                View Reservations
              </h3>
              <p className="text-sm text-yellow-600/80">
                Check current active book loans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
