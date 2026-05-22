import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddBook = () => {
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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    setImages(Array.from(e.target.files || []));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      images.forEach((file) => data.append("images", file));

      const res = await api.post("/book", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data?.message || "Book uploaded successfully");
      setForm({
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
      setImages([]);
      navigate("/books");
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message || err.message || "Upload failed";
      setMessage(status ? `${status}: ${message}` : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Book</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded" name="title" placeholder="Title" value={form.title} onChange={onChange} />
        <input className="w-full border p-2 rounded" name="examType" placeholder="Exam Type" value={form.examType} onChange={onChange} />
        <input className="w-full border p-2 rounded" name="subject" placeholder="Subject" value={form.subject} onChange={onChange} />
        <input className="w-full border p-2 rounded" name="originalPrice" type="number" placeholder="Original Price" value={form.originalPrice} onChange={onChange} />
        <input className="w-full border p-2 rounded" name="sellingPrice" type="number" placeholder="Selling Price" value={form.sellingPrice} onChange={onChange} />
        <input className="w-full border p-2 rounded" name="description" placeholder="Description" value={form.description} onChange={onChange} />
        <input className="w-full border p-2 rounded" name="location" placeholder="Location" value={form.location} onChange={onChange} />

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

        <input className="w-full border p-2 rounded" type="file" accept="image/*" multiple onChange={onImageChange} />

        <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-60" type="submit">
          {loading ? "Uploading..." : "Upload Book"}
        </button>
      </form>

      {message ? <p className="mt-3">{message}</p> : null}
    </div>
  );
};

export default AddBook;
