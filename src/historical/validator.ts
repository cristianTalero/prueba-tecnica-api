import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

/** Verify dates in body request */
export const dateValidatorMiddleware = [
  body(["fechaInicial", "fechaFinal"])
    .notEmpty()
    .isDate({ format: "yyyy-mm-dd" })
    .trim(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array({ onlyFirstError: true }),
      });
    }

    next();
  },
];
