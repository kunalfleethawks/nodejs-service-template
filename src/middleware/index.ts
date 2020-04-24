import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression
} from "./common";
import * as  winston from 'winston';
import * as expressWinston from 'express-winston';

import { handleAPIDocs } from "./apiDocs";
import { logger } from "./logger";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs
];
