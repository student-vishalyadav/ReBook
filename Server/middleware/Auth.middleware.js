const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "himeradilhimeradil";

const auth = async (req, res, next) => {

  try {

    const cookieToken = req.cookies?.token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const bearerToken =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;
    const token = cookieToken || bearerToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }
};

module.exports = auth;
