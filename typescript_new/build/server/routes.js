"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var UserValidations_1 = require("../app/validators/UserValidations");
var UserController_1 = require("../app/controllers/UserController");
var ValidateRequestMiddleware_1 = require("../app/middlewarers/ValidateRequestMiddleware");
var TokenController_1 = require("../app/controllers/TokenController");
var TokenValidations_1 = require("../app/validators/TokenValidations");
var routes = express.Router();
routes.get('/public', express.static(path.resolve(__dirname, '..', '..', 'public')));
routes.get('/', function (request, response) {
    return response.send("Hello World");
});
routes.post('/user', UserValidations_1.UserValidations.store, ValidateRequestMiddleware_1.ValidateRequestMiddleware.valide, UserController_1.UserController.store);
routes.post('/user/token', TokenValidations_1.TokenValidations.store, ValidateRequestMiddleware_1.ValidateRequestMiddleware.valide, TokenController_1.TokenController.store);
exports.default = routes;
//# sourceMappingURL=routes.js.map