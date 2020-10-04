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
var bcrypt = require("bcrypt");
var Addess_1 = require("./Addess");
var Market = /** @class */ (function () {
    function Market() {
    }
    Market.prototype.hashPassword = function () {
        this.password = bcrypt.hashSync(this.password, 10);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Market.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Market.prototype, "cnpj", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Market.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'decimal' }),
        __metadata("design:type", Number)
    ], Market.prototype, "minDeliveryAmount", void 0);
    __decorate([
        typeorm_1.Column({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], Market.prototype, "isOpen", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Market.prototype, "picture", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Market.prototype, "phone", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Market.prototype, "password", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Market.prototype, "hashPassword", null);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Addess_1.Address; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Addess_1.Address)
    ], Market.prototype, "address", void 0);
    Market = __decorate([
        typeorm_1.Entity({ name: 'markets' })
    ], Market);
    return Market;
}());
exports.Market = Market;
//# sourceMappingURL=Market.js.map