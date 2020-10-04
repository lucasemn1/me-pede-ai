"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var UserValidations = /** @class */ (function () {
    function UserValidations() {
    }
    UserValidations.store = [
        express_validator_1.body('name').isString().isLength({ max: 255, min: 2 }),
        express_validator_1.body('email').isEmail().isLength({ min: 5, max: 255 }),
        express_validator_1.body('dateOfBirth').isDate(),
        express_validator_1.body('password').isString().isLength({ min: 3, max: 255 }),
    ];
    return UserValidations;
}());
exports.UserValidations = UserValidations;
//# sourceMappingURL=UserValidations.js.map