import * as dotenv from "dotenv";
dotenv.config();
//
// import helmet from "helmet";
// import express from "express";
// import cors from "cors";
// import * as mongoose from "mongoose";
//
// // import router from "./router";
//
// const PORT = process.env.PORT || 9000;
// const app = express();
//
// app.use(helmet());
// app.use(express.json());
// // app.use(express.static("public"));
// app.use(cors());
//
// app.get("/", (req, res) => {
//   res.send("Express + TypeScript Server");
// });
//
// // app.use("/api", router);
//
// (async () => {
//   try {
//     await mongoose.connect(process.env.DB_URL!, {
//       dbName: process.env.DB_NAME,
//     });
//     app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}; DB is OK`));
//   } catch (e) {
//     console.log(e);
//   }
// })();

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
