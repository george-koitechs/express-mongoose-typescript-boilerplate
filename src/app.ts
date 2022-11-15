import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import httpStatus from "http-status";

import routes from "@/router";
import { morganSuccessHandler, morganErrorHandler } from "@/config/morgan";
import { IS_TEST, APP_PREFIX_PATH } from "@/config/config";
import ApiError from "@/utils/apiError";
import { errorConverter, errorHandler } from "@/middlewares/error";

const app = express();

if (!IS_TEST) {
  app.use(morganSuccessHandler);
  app.use(morganErrorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

app.use(cors());
// add static folder if needed
// app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.send("Healthy");
});

app.use(APP_PREFIX_PATH, routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
