import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_ACCESS_SECRET } from "@/config/config";
import { CheckAuthRequest } from "@/types";

export function getTokenIfExist(req: Request, res: Response, next: NextFunction) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  //
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
      // FIXME
      // @ts-ignore
      (req as CheckAuthRequest).userId = decoded.id;
      next();
    } catch (e) {
      next();
    }
  } else {
    next();
  }
}
