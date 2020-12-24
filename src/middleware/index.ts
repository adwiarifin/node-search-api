import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
} from "./common";

import { handleAPIDocs } from "./apiDocs";

import {
  handleCSRF,
  handleHTTPHeaders,
  handleJSONBodyLimit,
  handleRateLimit,
} from "./security";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleCookie,
  handleAPIDocs,
  handleRateLimit,
  handleJSONBodyLimit,
  handleHTTPHeaders,
  handleCSRF,
];
