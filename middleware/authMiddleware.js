const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  console.log("Incoming headers:", req.headers);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization header missing or incorrect format");
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token received:", token);  // Log the token to check its presence

  try {
    // Verify the token using the secret key from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);  // Log decoded token details
    req.user = { username: decoded.username, userid: decoded.userid };
    return next();
  } catch (err) {
    console.error("Token verification error:", err);  // Log the error
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
}

module.exports = authMiddleware;