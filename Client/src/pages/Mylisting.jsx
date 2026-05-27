import { Link } from "react-router-dom";

const MyListing = () => {
  return (
    <main
      className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-50 to-white px-4 py-10 sm:px-6"
      style={{ fontFamily: "'Segoe UI', 'Trebuchet MS', sans-serif" }}
    >
      <section className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">My Listings</h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          This page is ready for your personal book listings. You can show the books posted by
          the logged-in user here.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
          No listing UI is connected yet.
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/add-book"
            className="rounded-lg bg-sky-700 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Add New Book
          </Link>
          <Link
            to="/books"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Browse All Books
          </Link>
        </div>
      </section>
    </main>
  );
};

export default MyListing;
