import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const formatPrice = (value) => `Rs. ${value ?? "-"}`;

const getBookMeta = (book) => [
  { label: "Category", value: book.category },
  { label: "Subject", value: book.subject },
  { label: "Exam", value: book.examType || "-" },
  { label: "Condition", value: book.condition },
];

const AllBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await api.get("/book");
        setBooks(res.data?.books || []);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Could not load books.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <main
      className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-50 to-white"
      style={{ fontFamily: "'Segoe UI', 'Trebuchet MS', sans-serif" }}
    >
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Book Collection
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl md:text-4xl">
              Find Your Next Study Book
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Compare price and condition, then connect directly with student sellers.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            {books.length} books listed
          </div>
        </div>

        {isLoading ? <p className="text-slate-600">Loading books...</p> : null}
        {error ? <p className="text-red-600">{error}</p> : null}
        {!isLoading && !error && books.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
            No books available right now.
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <article
              key={book._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                {Array.isArray(book.images) && book.images.length > 0 ? (
                  <img
                    src={book.images[0]}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                    No image
                  </div>
                )}
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    book.isSold
                      ? "bg-red-100 text-red-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {book.isSold ? "Sold" : "Available"}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <h2 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900">
                  {book.title}
                </h2>

                <p className="line-clamp-2 text-sm text-slate-600">
                  {book.description}
                </p>

                <div className="grid grid-cols-1 gap-2 rounded-xl bg-slate-50 p-3 text-sm sm:grid-cols-2">
                  {getBookMeta(book).map((item) => (
                    <p key={item.label} className="text-slate-600">
                      <span className="font-semibold text-slate-800">{item.label}:</span>{" "}
                      {item.value}
                    </p>
                  ))}
                </div>

                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-sm text-slate-400 line-through">{formatPrice(book.originalPrice)}</p>
                  <p className="text-2xl font-extrabold text-sky-700">{formatPrice(book.sellingPrice)}</p>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => navigate(`/books/${book._id}`, { state: { book } })}
                    className="w-full rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800 sm:w-auto"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AllBooks;
