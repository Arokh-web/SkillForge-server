import jwt from "jsonwebtoken";

export const tokenGen = (req, res, next) => {
  try {
    // HERE GOES THE LOGIC TO SIGN UP AN USER
    const secret = process.env.JWT_SECRET; // This will come from the server environment
    const payload = { userId: user.id }; // The data we want to enclose in the JWT
    const tokenOptions = { expiresIn: "6d" }; // We will limit the dura
    const token = jwt.sign(payload, secret, tokenOptions);
    res.json({ token });
  } catch (e) {
    next(e);
  }
};

export default tokenGen;
