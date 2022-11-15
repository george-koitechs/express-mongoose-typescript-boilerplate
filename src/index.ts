import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import app from "./app";
import { APP_PORT, DB, DB_URI, IS_TEST } from "@/config/config";
import logger from "./config/logger";

let dbURI: string;
if (DB.HOST && DB.NAME && DB.PASSWORD && DB.USER) {
  dbURI = `mongodb://${DB.USER}:${encodeURIComponent(DB.PASSWORD)}@${DB.HOST}:${DB.PORT}`;
} else {
  dbURI = DB_URI;
}

if (IS_TEST) {
  dbURI += "-test";
}

mongoose
  .connect(dbURI, { dbName: DB.NAME })
  .then(() => {
    logger.info("Mongoose connection done");
    app.listen(APP_PORT, () => {
      logger.info(`server listening on ${APP_PORT}`);
    });
  })
  .catch((e) => {
    logger.info("Mongoose connection error");
    logger.error(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  logger.debug("Mongoose default connection open to " + dbURI);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  logger.error("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection (ctrl + c)
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception: " + err);
});
