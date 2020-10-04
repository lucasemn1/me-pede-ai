"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var TokenValidations = /** @class */ (function () {
    function TokenValidations() {
    }
    TokenValidations.store = [
        express_validator_1.body('email').isEmail().isLength({ max: 255, min: 2 }),
        express_validator_1.body('password').isString().isLength({ min: 3, max: 255 }),
    ];
    return TokenValidations;
}());
exports.TokenValidations = TokenValidations;
//# sourceMappingURL=TokenValidations.js.map