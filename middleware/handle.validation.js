import { validationResult } from "express-validator";

export const handleValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "validation errors",
      errors: errors.array(),
    });
  }
  next()
};