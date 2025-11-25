import React from "react";

// This interface defines what data a BookCard needs to work
interface BookProps {
  title: string;
  author: string;
  category: string;
}

const BookCard = ({ title, author, category }: BookProps) => {
  return (
    <div className="bg-white text-black border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Author:</span> {author}
        </p>
        <p className="text-sm text-blue-600 font-medium bg-blue-50 inline-block px-2 py-1 rounded-md">
          {category}
        </p>
      </div>
      <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        View Details
      </button>
    </div>
  );
};

export default BookCard;
