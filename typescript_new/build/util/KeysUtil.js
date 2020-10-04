"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var KeysUtil = /** @class */ (function () {
    function KeysUtil() {
    }
    KeysUtil.generatePrivateKey = function () {
        var dh = crypto.createDiffieHellman(512);
        dh.generateKeys();
        return dh.getPrivateKey('base64');
    };
    return KeysUtil;
}());
exports.default = KeysUtil;
//# sourceMappingURL=KeysUtil.js.map