import { CONSTANTS } from "@/constants";

export class ApiError {
  constructor(message: string) {
    // this.errors = [{ message }];
  }

  static Unauthorized() {
    return new ApiError(CONSTANTS.ERROR_MESSAGES.FORBIDDEN);
  }

  static BadRequest(message: string) {
    return new ApiError(message);
  }

  static NotFound() {
    return new ApiError(CONSTANTS.ERROR_MESSAGES.NOT_FOUND);
  }
}
