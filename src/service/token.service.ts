import jwt from "jsonwebtoken";

import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  REFRESH_TOKEN_EXPIRATION_TIME,
} from "@/config/config";
import tokenModel from "@/models/token.model";

class TokenService {
  // FIXME
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await tokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken: string) {
    return tokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
