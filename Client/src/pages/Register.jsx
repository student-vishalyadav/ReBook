import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const benefits = [
  "Simple flow for buying and selling",
  "Faster local listing reach",
  "Direct student-to-student communication",
];

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const res = await api.post("/user/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
        phone: form.phone,
      });
      setMessage(res.data?.msg || "Account created successfully.");
      navigate("/home");
    } catch (error) {
      setMessage(error.response?.data || error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-50 to-white px-6 py-10 md:py-14"
      style={{ fontFamily: "'Segoe UI', 'Trebuchet MS', sans-serif" }}
    >
      <section className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:grid-cols-2 md:rounded-3xl">
        <div className="relative bg-slate-900 p-6 text-white sm:p-8 md:p-10">
          <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-sky-500/30 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-amber-400/20 blur-2xl" />
          <div className="relative">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200">
              Welcome to BookSwap
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
              Create your account and start selling.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
              A student-friendly space to exchange exam books at fair prices.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-200">
              {benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
            <Link
              to="/login"
              className="w-1/2 rounded-lg px-4 py-2 text-center text-sm font-semibold text-slate-600 transition hover:text-slate-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-1/2 rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-slate-900 shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="username"
              placeholder="Full Name"
              value={form.username}
              onChange={onInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
              required
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={onInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={onInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={onInputChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
              required
            />
            <button
              className="w-full rounded-xl bg-sky-700 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-sky-400"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Create Account"}
            </button>
          </form>

          {message ? (
            <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
              {message}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default Register;
