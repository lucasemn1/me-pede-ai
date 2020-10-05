"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("../models/User");
var PasswordUtil_1 = require("../../util/PasswordUtil");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.getUserFromLogin = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.createConnection()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, connection
                                .getRepository(User_1.User)
                                .createQueryBuilder('users')
                                .where('users.email LIKE :email', { email: email })
                                .getOne()];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, connection.close()];
                    case 4:
                        _a.sent();
                        if (!PasswordUtil_1.default.isValidPassword(password, user.password)) {
                            throw new Error("Login invalid");
                        }
                        return [2 /*return*/, user];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.createConnection()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        return [4 /*yield*/, connection
                                .getRepository(User_1.User)
                                .createQueryBuilder('users')
                                .where('id = :id', { id: id })
                                .getOne()];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, connection.close()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, user];
                    case 5:
                        err_2 = _a.sent();
                        return [4 /*yield*/, connection.close()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, id, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.createConnection()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        return [4 /*yield*/, connection.manager.save(user)];
                    case 3:
                        id = (_a.sent()).id;
                        return [4 /*yield*/, connection.close()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, id ? true : false];
                    case 5:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [4 /*yield*/, connection.close()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.deleteUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.createConnection()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        return [4 /*yield*/, connection.manager
                                .createQueryBuilder()
                                .delete()
                                .from(User_1.User, 'users')
                                .where('users.id = :id', { id: id })
                                .execute()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, connection.close()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 5:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [4 /*yield*/, connection.close()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return UserRepository;
}());
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map