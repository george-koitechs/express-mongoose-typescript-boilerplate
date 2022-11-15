import { body } from "express-validator";

import { CONSTANTS } from "@/constants";
import { validate } from "@/service/validation.service";

export const loginValidation = validate([
  body("email", CONSTANTS.ERROR_MESSAGES.EMAIL_NOT_VALID).isEmail(),
  body("password", CONSTANTS.ERROR_MESSAGES.PASSWORD_MIN_LENGTH_MSG).isLength({
    min: 5,
  }),
]);

export const registerValidation = validate([
  body("email", CONSTANTS.ERROR_MESSAGES.EMAIL_NOT_VALID).isEmail(),
  body("password", CONSTANTS.ERROR_MESSAGES.PASSWORD_MIN_LENGTH_MSG).isLength({
    min: 5,
  }),
]);
