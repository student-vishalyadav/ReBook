const userModel = require("../models/user.schema");
const Book = require("../models/Book.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET || "himeradilhimeradil";

const signup = async (req, res) => {
  try {
    let { username, email, password, phone } = req.body;

    // Validation
    if (!username || !email || !password || !phone) {
      return res.status(400).send("All fields are required");
    }

    email = email.trim().toLowerCase();

    // Check existing user
    let existuser = await userModel.findOne({ email });

    if (existuser) {
      return res.status(409).send("User already exists, please login");
    }

    // Hash password
    let hash = await bcrypt.hash(password, 10);

    // Create user
    let newuser = await userModel.create({
      username,
      email,
      password: hash,
      phone,
    });

    // Generate JWT token
    let token = jwt.sign(
      {
        id: newuser._id,
        email: newuser.email,
      },
      JWT_SECRET,
      {
        expiresIn: "2d",
      },
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(201).json({msg:"User signed up successfully" , newuser});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }
    email = email.trim().toLowerCase();
    let existuser = await userModel.findOne({ email });
    if (!existuser) {
      return res.status(404).send("User is not registered");
    }
    let compare = await bcrypt.compare(password, existuser.password);
    if (!compare) {
      return res.status(401).send("Password is wrong");
    }
    let token = jwt.sign(
      { email: existuser.email, id: existuser._id },
      JWT_SECRET,
    );
    res.cookie("token", token);
    res.status(201).json({msg:"user is login successfully"} , existuser)  ;
  
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getCart = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .populate("cart.book", "title sellingPrice condition images seller isSold")
      .populate("cart.book.seller", "username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItems = (user.cart || []).filter((item) => item.book);

    return res.status(200).json({
      message: "Cart fetched successfully",
      cartItems,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const addToCart = async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = user.cart || [];

    const existingItem = user.cart.find(
      (item) => item.book.toString() === bookId
    );

    if (existingItem) {
      existingItem.quantity += Math.max(1, Number(quantity));
    } else {
      user.cart.push({ book: bookId, quantity: Math.max(1, Number(quantity)) });
    }

    await user.save();

    return res.status(200).json({ message: "Book added to cart" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    if (!bookId || Number(quantity) < 1) {
      return res.status(400).json({ message: "Valid bookId and quantity are required" });
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = user.cart || [];

    const item = user.cart.find((cartItem) => cartItem.book.toString() === bookId);
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.quantity = Number(quantity);
    await user.save();

    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { bookId } = req.params;

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = user.cart || [];

    user.cart = user.cart.filter((item) => item.book.toString() !== bookId);
    await user.save();

    return res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};


module.exports = { signup , login, getCart, addToCart, updateCartItem, removeCartItem };
