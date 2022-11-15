import { NextFunction, Request, Response } from "express";
import { ValidationChain } from "express-validator";

const { validationResult } = require("express-validator");

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // FIXME
    const errs = errors.array().map((el: any) => {
      // return { field: el.param, value: el.value, message: el.msg };
      return { message: el.msg };
    });

    res.status(400).json({ errors: errs });
  };
};
