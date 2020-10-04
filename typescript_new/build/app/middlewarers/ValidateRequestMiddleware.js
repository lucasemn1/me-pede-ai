"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var ValidateRequestMiddleware = /** @class */ (function () {
    function ValidateRequestMiddleware() {
    }
    ValidateRequestMiddleware.valide = function (request, response, next) {
        var erros = express_validator_1.validationResult(request);
        if (erros.isEmpty()) {
            return next();
        }
        return response.status(400).json({ errors: erros.array() });
    };
    return ValidateRequestMiddleware;
}());
exports.ValidateRequestMiddleware = ValidateRequestMiddleware;
//# sourceMappingURL=ValidateRequestMiddleware.js.map