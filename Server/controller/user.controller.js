const userModel = require("../models/user.schema");
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



module.exports = { signup , login };
