"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var privateKey = crypto.createDiffieHellman(512).generateKeys('base64');
console.log(privateKey);
//# sourceMappingURL=initEnv.js.map