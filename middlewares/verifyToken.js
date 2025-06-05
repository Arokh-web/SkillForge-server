import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    if (!authorization) throw Error("Please login to access this resource");

    // read the secret from the env
    const secret = process.env.JWT_SECRET; // This will come from the server environment

    // Get the token from the header (it is parted by a space)
    const token = authorization.split(" ")[1];
    // Verifying the token with the secret and saving it as payload
    const payload = jwt.verify(token, secret);

    req.userId = payload.userId; // Create custom property in request object
    next();
  } catch (e) {
    next(e);
  }
};

export default verifyToken;
