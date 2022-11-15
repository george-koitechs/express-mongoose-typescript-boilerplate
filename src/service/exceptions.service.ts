import { Request, Response } from "express";

import { CONSTANTS } from "@/constants";
import { ApiError } from "@/exceptions/api-error";

class ExceptionsService {
  // FIXME
  badRequest(error: any) {
    return function (req: Request, res: Response) {
      return res.status(400).json(error);
    };
  }

  // FIXME
  forbidden(error?: any) {
    return function (req: Request, res: Response) {
      const e = error ? error : new ApiError(CONSTANTS.ERROR_MESSAGES.FORBIDDEN);
      return res.status(403).json(e);
    };
  }
}

export default new ExceptionsService();
