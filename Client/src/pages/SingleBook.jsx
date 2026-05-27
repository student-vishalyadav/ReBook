import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const getBookMeta = (book) => [
  { label: "Category", value: book.category },
  { label: "Subject", value: book.subject },
  { label: "Exam", value: book.examType || "-" },
  { label: "Condition", value: book.condition },
];

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!location.state?.book);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (book?._id === id) {
        return;
      }

      try {
        setLoading(true);
        setError("");
        const res = await api.get("/book?limit=1000");
        const foundBook = (res.data?.books || []).find((b) => b._id === id);
        if (!foundBook) {
          setError("Book not found");
          return;
        }
        setBook(foundBook);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Could not load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, book?._id]);

  const onDelete = async () => {
    if (!book?._id || deleting) {
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to delete this book?");
    if (!isConfirmed) {
      return;
    }

    try {
      setDeleting(true);
      await api.delete(`/book/${book._id}`);
      navigate("/books");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Could not delete this book.");
    } finally {
      setDeleting(false);
    }
  };

  const onAddToCart = async () => {
    if (!book?._id || addingToCart) return;

    try {
      setAddingToCart(true);
      setError("");
      await api.post("/user/cart/add", { bookId: book._id, quantity: 1 });
      navigate("/add-cart");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Could not add to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <main className="px-4 py-10 text-slate-600 sm:px-6">Loading book details...</main>;
  }

  if (error || !book) {
    return (
      <main className="px-4 py-10 sm:px-6">
        <p className="text-red-600">{error || "Book not found"}</p>
        <button
          onClick={() => navigate("/books")}
          className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
        >
          Back to All Books
        </button>
      </main>
    );
  }

  return (
    <main
      className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-50 to-white"
      style={{ fontFamily: "'Segoe UI', 'Trebuchet MS', sans-serif" }}
    >
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <button
          onClick={() => navigate("/books")}
          className="mb-6 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Back to All Books
        </button>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <div className="grid gap-8 p-4 sm:p-6 md:grid-cols-2 md:p-8">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                {Array.isArray(book.images) && book.images.length > 0 ? (
                  <img src={book.images[0]} alt={book.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                    No image
                  </div>
                )}
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    book.isSold ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {book.isSold ? "Sold" : "Available"}
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{book.title}</h1>

              <p className="text-slate-700">{book.description}</p>

              <div className="grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                {getBookMeta(book).map((item) => (
                  <p key={item.label}>
                    <span className="font-semibold text-slate-800">{item.label}:</span> {item.value}
                  </p>
                ))}
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm text-slate-400 line-through">Rs. {book.originalPrice}</p>
                <p className="text-3xl font-extrabold text-sky-700">Rs. {book.sellingPrice}</p>
              </div>

              <div className="space-y-1 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                <p>
                  <span className="font-semibold text-slate-800">Seller:</span> {book.seller?.username || "-"}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Email:</span> {book.seller?.email || "-"}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Location:</span> {book.location || "-"}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Posted:</span>{" "}
                  {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "-"}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  onClick={onAddToCart}
                  disabled={addingToCart || book.isSold}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300 sm:w-auto"
                >
                  {book.isSold ? "Not Available" : addingToCart ? "Adding..." : "Add to Cart"}
                </button>
                <button
                  onClick={() => navigate(`/edit-book/${book._id}`, { state: { book } })}
                  className="w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 sm:w-auto"
                >
                  Update Book
                </button>
                <button
                  onClick={onDelete}
                  disabled={deleting}
                  className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400 sm:w-auto"
                >
                  {deleting ? "Deleting..." : "Delete Book"}
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default SingleBook;
