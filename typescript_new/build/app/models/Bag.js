"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Market_1 = require("./Market");
var Bag = /** @class */ (function () {
    function Bag() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Bag.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], Bag.prototype, "finish", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }),
        __metadata("design:type", User_1.User)
    ], Bag.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Market_1.Market; }),
        __metadata("design:type", Market_1.Market)
    ], Bag.prototype, "market", void 0);
    Bag = __decorate([
        typeorm_1.Entity({ name: 'bags' })
    ], Bag);
    return Bag;
}());
exports.Bag = Bag;
//# sourceMappingURL=Bag.js.map