import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="border-t border-slate-200 bg-slate-900 text-slate-200"
      style={{ fontFamily: "'Segoe UI', 'Trebuchet MS', sans-serif" }}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold text-white">StudySwap</h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
            A student-first platform to buy and sell second-hand exam books
            easily, responsibly, and affordably.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Quick Links
          </h4>
          <div className="mt-4 space-y-3 text-sm">
            <Link className="block hover:text-white" to="/home">
              Home
            </Link>
            <Link className="block hover:text-white" to="/books">
              Browse Books
            </Link>
            <Link className="block hover:text-white" to="/add-book">
              Add Book
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Support
          </h4>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>Email: support@StudySwap.in</p>
            <p>Mon to Sat: 9:00 AM - 7:00 PM</p>
            <p>Safe, direct student-to-student deals</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} StudySwap. All rights reserved.</p>
          <p>Made with care for learners across India.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
