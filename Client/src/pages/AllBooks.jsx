import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AllBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/book");
        setBooks(res.data?.books || []);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const onDelete = async (id) => {
    try {
      await api.delete(`/book/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">All Books</h1>

      {loading ? <p>Loading books...</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      {!loading && !error && books.length === 0 ? <p>No books found.</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {books.map((book) => (
          <article
            key={book._id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {Array.isArray(book.images) && book.images.length > 0 ? (
              <img src={book.images[0]} alt={book.title} className="w-full h-52 object-cover" />
            ) : (
              <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No image
              </div>
            )}

            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900 leading-snug">{book.title}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    book.isSold ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  {book.isSold ? "Sold" : "Available"}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-600"><span className="font-medium text-gray-800">Category:</span> {book.category}</p>
                <p className="text-gray-600"><span className="font-medium text-gray-800">Subject:</span> {book.subject}</p>
                <p className="text-gray-600"><span className="font-medium text-gray-800">Exam:</span> {book.examType || "-"}</p>
                <p className="text-gray-600"><span className="font-medium text-gray-800">Condition:</span> {book.condition}</p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-500 line-through">Rs. {book.originalPrice}</p>
                <p className="text-2xl font-bold text-blue-700">Rs. {book.sellingPrice}</p>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium text-gray-800">Seller:</span> {book.seller?.username || "-"}</p>
                <p><span className="font-medium text-gray-800">Email:</span> {book.seller?.email || "-"}</p>
                <p><span className="font-medium text-gray-800">Location:</span> {book.location}</p>
              </div>

              <p className="text-xs text-gray-400 pt-1">
                Posted: {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "-"}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => navigate(`/edit-book/${book._id}`, { state: { book } })}
                  className="px-3 py-1.5 text-sm rounded bg-amber-500 text-white"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(book._id)}
                  className="px-3 py-1.5 text-sm rounded bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
