import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const categoryOptions = ["College", "SSC", "JEE", "NEET", "UPSC", "Banking", "Railway"];
const conditionOptions = ["New", "Good", "Old"];

const initialForm = {
  title: "",
  category: "SSC",
  examType: "",
  subject: "",
  originalPrice: "",
  sellingPrice: "",
  condition: "Good",
  description: "",
  location: "",
};

const AddBook = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (event) => {
    setImages(Array.from(event.target.files || []));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      setIsSubmitting(true);
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      images.forEach((file) => data.append("images", file));

      const res = await api.post("/book", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data?.message || "Book uploaded successfully.");
      setForm(initialForm);
      setImages([]);
      navigate("/books");
    } catch (err) {
      const status = err?.response?.status;
      const errorMessage = err?.response?.data?.message || err.message || "Upload failed.";
      setMessage(status ? `${status}: ${errorMessage}` : errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-50 to-white px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h1 className="mb-1 text-2xl font-bold">Add Book</h1>
      <p className="mb-4 text-sm text-slate-600">Fill in the details below to post your book.</p>

      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded border p-2" name="title" placeholder="Title" value={form.title} onChange={onInputChange} />
        <input className="w-full rounded border p-2" name="examType" placeholder="Exam Type" value={form.examType} onChange={onInputChange} />
        <input className="w-full rounded border p-2" name="subject" placeholder="Subject" value={form.subject} onChange={onInputChange} />
        <input className="w-full rounded border p-2" name="originalPrice" type="number" placeholder="Original Price" value={form.originalPrice} onChange={onInputChange} />
        <input className="w-full rounded border p-2" name="sellingPrice" type="number" placeholder="Selling Price" value={form.sellingPrice} onChange={onInputChange} />
        <input className="w-full rounded border p-2" name="description" placeholder="Description" value={form.description} onChange={onInputChange} />
        <input className="w-full rounded border p-2" name="location" placeholder="Location" value={form.location} onChange={onInputChange} />

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

        <input className="w-full rounded border p-2" type="file" accept="image/*" multiple onChange={onImageChange} />

        <button disabled={isSubmitting} className="w-full rounded bg-blue-600 p-2 text-white disabled:opacity-60" type="submit">
          {isSubmitting ? "Uploading..." : "Upload Book"}
        </button>
      </form>

      {message ? <p className="mt-3 text-sm text-slate-700">{message}</p> : null}
      </div>
    </main>
  );
};

export default AddBook;
