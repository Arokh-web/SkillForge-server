// This validates REQUESTS against a given schema using Joi

import ErrorResponse from "../utils/ErrorResponse.js";

function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw new ErrorResponse(error.details[0].message, 400);
    }
    next();
  };
}
export default validateSchema;
