const express = require("express");
const {
  signup,
  login,
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controller/user.controller");
const auth = require("../middleware/Auth.middleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/cart", auth, getCart);
router.post("/cart/add", auth, addToCart);
router.patch("/cart", auth, updateCartItem);
router.delete("/cart/:bookId", auth, removeCartItem);


module.exports = router;
