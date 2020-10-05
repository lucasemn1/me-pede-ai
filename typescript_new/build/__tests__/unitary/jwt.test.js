"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JWTUtil_1 = require("../../util/JWTUtil");
describe('Json web token unitary tests', function () {
    var token = '';
    test('A jwt must be received', function () {
        var tokenToTest = JWTUtil_1.default.createToken(1);
        token = tokenToTest;
        expect(token).not.toBe(String);
    });
    test('The token must be valid', function () {
        var result = JWTUtil_1.default.isTokenValid(token);
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=jwt.test.js.map