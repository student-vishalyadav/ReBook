const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
require("./config/DB");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/Book.routes");
const cors = require("cors");

const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.get("/", (req, res) => {
  res.send("hi mera Dil");
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log("Your server is listen on this Port : " + port);
  });
}

module.exports = app;
