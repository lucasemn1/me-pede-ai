"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var PasswordUtil = /** @class */ (function () {
    function PasswordUtil() {
    }
    PasswordUtil.hashPassword = function (password) {
        return bcrypt.hashSync(password, 10);
    };
    PasswordUtil.isValidPassword = function (password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    };
    return PasswordUtil;
}());
exports.default = PasswordUtil;
//# sourceMappingURL=PasswordUtil.js.map