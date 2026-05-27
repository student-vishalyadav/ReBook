import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import AddCart from "../pages/AddCart";
import EditBook from "../pages/EditBook";
import SingleBook from "../pages/SingleBook";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/books" element={<AllBooks />} />
      <Route path="/books/:id" element={<SingleBook />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/add-cart" element={<AddCart />} />
      <Route path="/edit-book/:id" element={<EditBook />} />
    </Routes>
  );
};

export default AppRoutes;
