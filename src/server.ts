import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import "reflect-metadata";
import { SQLiteDbManager } from "./db/sqlLite";
import * as swaggerJSDocExpress from 'swagger-jsdoc-express';

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

SQLiteDbManager.connect();

const { PORT = 3000 } = process.env;
const server = http.createServer(router);


// create a '/swagger' endpoint ...
swaggerJSDocExpress.setupSwaggerUIFromSourceFiles(
  {
    cwd: '/src/services/search/',
    files: ['**/*.ts', '**/*.js'],
  },
  router
);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);
