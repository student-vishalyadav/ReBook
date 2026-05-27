import { useState } from "react";
import { Link } from "react-router-dom";
import bookSwapLogo from "../assets/ChatGPT Image May 23, 2026, 02_05_35 PM.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/home" className="flex items-center gap-3" onClick={closeMenu}>
          <img
            src={bookSwapLogo}
            alt="Book Swap Logo"
            className="h-10 w-10 rounded-xl border border-slate-200 object-cover shadow-sm"
          />
          <div className="leading-tight">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">BookSwap</h1>
            <p className="text-xs font-medium text-slate-500">Student Marketplace</p>
          </div>
        </Link>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 md:hidden"
          aria-label="Toggle menu"
          type="button"
        >
          Menu
        </button>

        <div className="hidden items-center gap-2 text-sm font-semibold md:flex">
          <Link
            to="/home"
            className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            to="/books"
            className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Books
          </Link>
          <Link
            to="/add-book"
            className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Add Book
          </Link>
          <Link
            to="/add-cart"
            className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Cart
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-sky-700 px-4 py-2 text-white transition hover:bg-sky-800"
          >
            Login
          </Link>
        </div>
      </div>

      {isOpen ? (
        <div className="mx-auto mt-3 grid w-full max-w-7xl gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold md:hidden">
          <Link
            to="/home"
            onClick={closeMenu}
            className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Home
          </Link>
          <Link
            to="/books"
            onClick={closeMenu}
            className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Books
          </Link>
          <Link
            to="/add-book"
            onClick={closeMenu}
            className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Add Book
          </Link>
          <Link
            to="/add-cart"
            onClick={closeMenu}
            className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Cart
          </Link>
          <Link
            to="/login"
            onClick={closeMenu}
            className="rounded-lg bg-sky-700 px-3 py-2 text-center text-white transition hover:bg-sky-800"
          >
            Login
          </Link>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
