import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditBook = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "SSC",
    examType: "",
    subject: "",
    originalPrice: "",
    sellingPrice: "",
    condition: "Good",
    description: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stateBook = location.state?.book;
    if (stateBook) {
      setForm({
        title: stateBook.title || "",
        category: stateBook.category || "SSC",
        examType: stateBook.examType || "",
        subject: stateBook.subject || "",
        originalPrice: stateBook.originalPrice || "",
        sellingPrice: stateBook.sellingPrice || "",
        condition: stateBook.condition || "Good",
        description: stateBook.description || "",
        location: stateBook.location || "",
      });
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
        setForm({
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
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load book");
      }
    };

    fetchBook();
  }, [id, location.state]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.put(`/book/${id}`, form);
      navigate("/books");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      {error ? <p className="text-red-600 mb-3">{error}</p> : null}

      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded" name="title" value={form.title} onChange={onChange} placeholder="Title" />
        <input className="w-full border p-2 rounded" name="examType" value={form.examType} onChange={onChange} placeholder="Exam Type" />
        <input className="w-full border p-2 rounded" name="subject" value={form.subject} onChange={onChange} placeholder="Subject" />
        <input className="w-full border p-2 rounded" name="originalPrice" type="number" value={form.originalPrice} onChange={onChange} placeholder="Original Price" />
        <input className="w-full border p-2 rounded" name="sellingPrice" type="number" value={form.sellingPrice} onChange={onChange} placeholder="Selling Price" />
        <input className="w-full border p-2 rounded" name="description" value={form.description} onChange={onChange} placeholder="Description" />
        <input className="w-full border p-2 rounded" name="location" value={form.location} onChange={onChange} placeholder="Location" />

        <select className="w-full border p-2 rounded" name="category" value={form.category} onChange={onChange}>
          <option value="College">College</option>
          <option value="SSC">SSC</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
          <option value="UPSC">UPSC</option>
          <option value="Banking">Banking</option>
          <option value="Railway">Railway</option>
        </select>

        <select className="w-full border p-2 rounded" name="condition" value={form.condition} onChange={onChange}>
          <option value="New">New</option>
          <option value="Good">Good</option>
          <option value="Old">Old</option>
        </select>

        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60" type="submit">
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button className="px-4 py-2 rounded bg-gray-200" type="button" onClick={() => navigate("/books")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
