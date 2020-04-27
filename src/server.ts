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

/** Custom Log and Metric Logger */
const customLogger = (logEntry: any) => {
  const MESSAGE = Symbol.for('message');

  const apiUrlParts = logEntry.req.url.split('/');
  const apiName = apiUrlParts[apiUrlParts.length - 1];
  const base = { timestamp: new Date(), eventSource: 'FleetManagerService', apiName: apiName };
  let json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
}


const router = express();
router.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  metaField: "null",
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

  dynamicMeta: function (req, res) {
    return {
      user: 'kunal'

    }
  },
  format: winston.format(customLogger)(),
}));
applyMiddleware(middleware, router);
applyRoutes(routes, router);

// express-winston errorLogger makes sense AFTER the router.
router.use(expressWinston.errorLogger({
  exceptionToMeta: function (error) {
    return {
      stack: error.name,
      message: error.message
    };
  },
  metaField:"null",
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

applyMiddleware(errorHandlers, router);


const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);
