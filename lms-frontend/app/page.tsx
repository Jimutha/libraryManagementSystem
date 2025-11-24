import BookCard from "@/components/BookCard";

export default function Home() {
  // Fake data for testing
  const books = [
    { id: 1, title: "Dune", author: "Frank Herbert", category: "Fiction" },
    { id: 2, title: "1984", author: "George Orwell", category: "Fiction" },
    {
      id: 3,
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      category: "Science",
    },
  ];

  return (
    <main className="min-h-screen p-12 bg-gray-100 text-black">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-900">
          Library Catalog
        </h1>
        <p className="text-lg text-gray-600">
          Browse our collection of amazing books
        </p>
      </div>

      {/* Book Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            category={book.category}
          />
        ))}
      </div>
    </main>
  );
}
