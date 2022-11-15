import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import exceptionsService from "@/service/exceptions.service";
import { JWT_ACCESS_SECRET } from "@/config/config";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
      // FIXME
      // @ts-ignore
      req.userId = decoded.id;
      next();
    } catch (e) {
      return exceptionsService.forbidden()(req, res);
    }
  } else {
    return exceptionsService.forbidden()(req, res);
  }
}
