import ErrorResponse from "../utils/ErrorResponse.js";

const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return next(new ErrorResponse("Unauthorized access. Admins only.", 403));
  }
  next();
};
export default verifyAdmin;
