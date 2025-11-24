import React from "react";

// This defines what data a BookCard needs to work
interface BookProps {
  title: string;
  author: string;
  category: string;
}

const BookCard = ({ title, author, category }: BookProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white text-black">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">Author: {author}</p>
      <p className="text-sm text-blue-500 mt-2">{category}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        View Details
      </button>
    </div>
  );
};

export default BookCard;
