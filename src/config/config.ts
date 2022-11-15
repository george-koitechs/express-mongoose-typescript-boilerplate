export const ENVIRONMENT = process.env.APP_ENV || "dev";
export const IS_PRODUCTION = ENVIRONMENT === "production";
export const IS_TEST = ENVIRONMENT === "test";
export const APP_PORT = Number(process.env.APP_PORT) || 8000;
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || "/";
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "JWT_ACCESS_SECRET";
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "JWT_REFRESH_SECRET";
export const ACCESS_TOKEN_EXPIRATION_TIME = process.env.ACCESS_TOKEN_EXPIRATION_TIME || "30m";
export const REFRESH_TOKEN_EXPIRATION_TIME = process.env.REFRESH_TOKEN_EXPIRATION_TIME || "15d";
export const DB = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_USER_PWD,
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
  PORT: Number(process.env.DB_PORT) || 27017,
};
export const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/Mocks";
