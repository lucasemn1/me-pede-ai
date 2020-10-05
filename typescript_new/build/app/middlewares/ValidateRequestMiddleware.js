"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var ValidateRequestMiddleware = /** @class */ (function () {
    function ValidateRequestMiddleware() {
    }
    ValidateRequestMiddleware.valide = function (req, res, next) {
        var erros = express_validator_1.validationResult(req);
        if (erros.isEmpty()) {
            return next();
        }
        return res.status(400).json({ errors: erros.array() });
    };
    return ValidateRequestMiddleware;
}());
exports.ValidateRequestMiddleware = ValidateRequestMiddleware;
//# sourceMappingURL=ValidateRequestMiddleware.js.map