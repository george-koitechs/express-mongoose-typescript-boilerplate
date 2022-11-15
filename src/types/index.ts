import { Request } from "express";

export interface CheckAuthRequest extends Request {
  userId: string;
}
