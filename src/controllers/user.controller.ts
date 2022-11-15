import { Request, Response } from "express";

import userService from "@/service/user.service";
import exceptionsService from "@/service/exceptions.service";
import { CheckAuthRequest } from "@/types";

class UserController {
  async registration(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      return res.json(userData);
    } catch (e) {
      return exceptionsService.badRequest(e)(req, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      return res.json(userData);
    } catch (e) {
      return exceptionsService.badRequest(e)(req, res);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const refreshTokenWithBearer = req.headers.refreshtoken || "";
      const refreshToken = !Array.isArray(refreshTokenWithBearer) && refreshTokenWithBearer.replace(/Bearer\s?/, "");
      if (!refreshToken) return res.json();
      await userService.logout(refreshToken);
      return res.json();
    } catch (e) {
      return exceptionsService.badRequest(e)(req, res);
    }
  }

  async me(req: Request, res: Response) {
    const userData = await userService.me((req as CheckAuthRequest).userId);
    return res.json(userData);
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshTokenWithBearer = req.headers.refreshtoken || "";
      const refreshToken = !Array.isArray(refreshTokenWithBearer) && refreshTokenWithBearer.replace(/Bearer\s?/, "");
      if (!refreshToken) return;
      const userData = await userService.refresh(refreshToken);
      return res.json(userData);
    } catch (e) {
      return exceptionsService.badRequest(e)(req, res);
    }
  }
}

export default new UserController();
