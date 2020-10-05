"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var KeysUtil_1 = require("../util/KeysUtil");
var lines = {
    HOST: '',
    PRIVATE_KEY: KeysUtil_1.default.generatePrivateKey(),
    NODE_ENV: '',
    DB_HOST: '',
    DB_DATABASE: '',
    DB_TESTS_DATABASE: '',
    DB_USER: '',
    DB_PASSWORD: '',
};
var fileValue = '';
for (var line in lines) {
    fileValue += line + "=" + lines[line] + "\n";
}
fs.writeFile(path.resolve(__dirname, '..', '.env'), fileValue, function (err) {
    console.log(err ? err : 'Ok');
});
//# sourceMappingURL=generateEnvFile.js.map