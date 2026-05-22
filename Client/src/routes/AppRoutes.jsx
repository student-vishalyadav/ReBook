import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />

      <Route path="/books" element={<AllBooks />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/edit-book/:id" element={<EditBook />} />
    </Routes>
  );
};

export default AppRoutes;
