"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var path = require("path");
var routes_1 = require("./routes");
var app = express();
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
app.use(express.json());
app.use(routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map