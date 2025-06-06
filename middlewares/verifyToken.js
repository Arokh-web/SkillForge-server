import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  console.log("VERIFY TOKEN MIDDLEWARE TRIGGERED");
  console.log("Cookies:", req.cookies);
  console.log("Token:", req.cookies.token);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }
  try {
    // Verifying the token with the secret and saving it as payload
    console.log("Verifying token:", token);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", payload);
    req.userId = payload.userId;
    next();
  } catch (e) {
    console.error("Token verification failed:", e.message);
    return res
      .status(401)
      .json({ error: "Unauthorized access. Invalid token." });
  }
};

export default verifyToken;
