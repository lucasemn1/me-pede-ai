"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}
exports.hashPassword = hashPassword;
//# sourceMappingURL=util.js.map