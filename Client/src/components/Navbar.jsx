import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            BookMarket
          </h1>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6 text-lg">
          
          <Link
            to="/"
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>

          <Link
            to="/books"
            className="hover:text-gray-200 transition"
          >
            Books
          </Link>
          <Link
            to="/add-book"
            className="hover:text-gray-200 transition"
          >
            Add Book
          </Link>

          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Login
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;