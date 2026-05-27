import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const categoryOptions = ["College", "SSC", "JEE", "NEET", "UPSC", "Banking", "Railway"];
const conditionOptions = ["New", "Good", "Old"];

const createFormFromBook = (book = {}) => ({
  title: book.title || "",
  category: book.category || "SSC",
  examType: book.examType || "",
  subject: book.subject || "",
  originalPrice: book.originalPrice || "",
  sellingPrice: book.sellingPrice || "",
  condition: book.condition || "Good",
  description: book.description || "",
  location: book.location || "",
});

const EditBook = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(createFormFromBook());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stateBook = location.state?.book;
    if (stateBook) {
      setForm(createFormFromBook(stateBook));
      return;
    }

    const fetchBook = async () => {
      try {
        const res = await api.get("/book");
        const book = (res.data?.books || []).find((b) => b._id === id);
        if (!book) {
          setError("Book not found");
          return;
        }
        setForm(createFormFromBook(book));
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load book");
      }
    };

    fetchBook();
  }, [id, location.state]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await api.put(`/book/${id}`, form);
      navigate("/books");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Could not update the book.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-50 to-white px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h1 className="mb-1 text-2xl font-bold">Edit Book</h1>
      <p className="mb-4 text-sm text-slate-600">Update the details and save your changes.</p>
      {error ? <p className="text-red-600 mb-3">{error}</p> : null}

      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded border p-2" name="title" value={form.title} onChange={onInputChange} placeholder="Title" />
        <input className="w-full rounded border p-2" name="examType" value={form.examType} onChange={onInputChange} placeholder="Exam Type" />
        <input className="w-full rounded border p-2" name="subject" value={form.subject} onChange={onInputChange} placeholder="Subject" />
        <input className="w-full rounded border p-2" name="originalPrice" type="number" value={form.originalPrice} onChange={onInputChange} placeholder="Original Price" />
        <input className="w-full rounded border p-2" name="sellingPrice" type="number" value={form.sellingPrice} onChange={onInputChange} placeholder="Selling Price" />
        <input className="w-full rounded border p-2" name="description" value={form.description} onChange={onInputChange} placeholder="Description" />
        <input className="w-full rounded border p-2" name="location" value={form.location} onChange={onInputChange} placeholder="Location" />

        <select className="w-full rounded border p-2" name="category" value={form.category} onChange={onInputChange}>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select className="w-full rounded border p-2" name="condition" value={form.condition} onChange={onInputChange}>
          {conditionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button disabled={isSubmitting} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60" type="submit">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button className="px-4 py-2 rounded bg-gray-200" type="button" onClick={() => navigate("/books")}>
            Cancel
          </button>
        </div>
      </form>
      </div>
    </main>
  );
};

export default EditBook;
