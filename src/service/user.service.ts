import bcrypt from "bcrypt";

import UserModel from "@/models/user.model";
import { ApiError } from "@/exceptions/api-error";
import { CONSTANTS } from "@/constants";
import { uuidLong } from "@/utils/uuidGenerators";
import { UserDTO } from "@/dto/user.dto";
import tokenService from "@/service/token.service";

class UserService {
  async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) throw ApiError.BadRequest(CONSTANTS.ERROR_MESSAGES.USER_ALREADY_EXIST);

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidLong();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

    const userDTO = new UserDTO({
      email: user.email,
      id: user.id,
      isActivated: user.isActivated,
    });
    const tokens = tokenService.generateTokens({ ...userDTO });
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw ApiError.BadRequest(CONSTANTS.ERROR_MESSAGES.WRONG_CREDENTIALS);

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiError.BadRequest(CONSTANTS.ERROR_MESSAGES.WRONG_CREDENTIALS);

    const userDTO = new UserDTO({
      email: user.email,
      id: user.id,
      isActivated: user.isActivated,
    });
    const tokens = tokenService.generateTokens({ ...userDTO });

    await tokenService.saveToken(userDTO.id, tokens.refreshToken);
    return { ...tokens, user: userDTO };
  }

  async logout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken);
  }

  async me(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw ApiError.Unauthorized();

    return new UserDTO({
      email: user.email,
      id: user.id,
      isActivated: user.isActivated,
    });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.Unauthorized();
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenData = await tokenService.findToken(refreshToken);
    if (!userData || !tokenData) throw ApiError.Unauthorized();
    const user = await UserModel.findById(tokenData.user);
    if (!user) return;
    const userDTO = new UserDTO({
      email: user.email,
      id: user.id,
      isActivated: user.isActivated,
    });
    const tokens = tokenService.generateTokens({ ...userDTO });
    return { accessToken: tokens.accessToken };
  }
}

export default new UserService();
