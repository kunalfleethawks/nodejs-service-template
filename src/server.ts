import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import * as  winston from 'winston';
import * as expressWinston from 'express-winston';
process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const router = express();
router.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],

  level: function (req, res) {
    var level = "";
    if (res.statusCode >= 100) { level = "info"; }
    if (res.statusCode >= 400) { level = "warn"; }
    if (res.statusCode >= 500) { level = "error"; }
    // Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
    if (res.statusCode == 401 || res.statusCode == 403) { level = "critical"; }
    // No one should be using the old path, so always warn for those
    // if (req.path === "/v1" && level === "info") { level = "warn"; }
    return level;
  },
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));
applyMiddleware(middleware, router);
applyRoutes(routes, router);
// applyMiddleware(errorHandlers, router);
router.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],

  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}))

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);
