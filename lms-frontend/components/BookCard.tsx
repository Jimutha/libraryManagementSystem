import React from "react";
import Link from "next/link";

// This interface defines what data a BookCard needs to work
interface BookProps {
  id: number; // Added ID so we know which book to link to
  title: string;
  author: string;
  category: string;
}

const BookCard = ({ id, title, author, category }: BookProps) => {
  return (
    <div className="bg-white text-black border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Author:</span> {author}
        </p>
        <p className="text-sm text-blue-600 font-medium bg-blue-50 inline-block px-2 py-1 rounded-md mt-2">
          {category}
        </p>
      </div>

      {/* The button is now a Link to the dynamic page */}
      <Link
        href={`/books/${id}`}
        className="mt-6 w-full block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
      >
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
