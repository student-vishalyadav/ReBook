import { Link } from "react-router-dom";
import bookSwapLogo from "../assets/ChatGPT Image May 23, 2026, 02_05_35 PM.png";

const stats = [
  { value: "1000+", label: "Books listed" },
  { value: "Fast", label: "City-level matches" },
  { value: "Trusted", label: "Direct student deals" },
];

const reasons = [
  "Save money by buying good second-hand books.",
  "Sell your completed books and help another student.",
  "Connect locally and close deals quickly.",
  "Simple process. Better savings. Less stress.",
];

const Home = () => {
  return (
    <main
      className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-amber-50 via-white to-sky-50"
      style={{ fontFamily: "'Segoe UI', 'Trebuchet MS', sans-serif" }}
    >
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <img
              src={bookSwapLogo}
              alt="Book Swap Logo"
              className="h-11 w-11 rounded-xl border border-slate-200 object-cover"
            />
            <div className="text-left leading-tight">
              <p className="text-base font-extrabold tracking-tight text-slate-900">
                BookSwap
              </p>
              <p className="text-xs font-medium text-slate-500">
                Smart Student Marketplace
              </p>
            </div>
          </div>

          <p className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-900">
            Built for students, by students
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Buy and sell exam books without the headache.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            BookSwap helps students find affordable used books nearby. No
            complicated flow, just list, connect, and exchange.
          </p>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <Link
              to="/books"
              className="rounded-xl bg-sky-700 px-6 py-3 text-center text-base font-semibold text-white shadow-md transition hover:bg-sky-800"
            >
              Explore Books
            </Link>
            <Link
              to="/add-book"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Post Your Book
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-amber-200/40 blur-2xl" />
          <div className="absolute -bottom-10 -right-6 h-44 w-44 rounded-full bg-sky-200/50 blur-2xl" />

          <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">
              Why students use BookSwap
            </h2>
            <ul className="mt-5 grid gap-4 text-slate-700">
              {reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex min-h-[72px] items-center rounded-lg bg-slate-50 p-4"
                >
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
