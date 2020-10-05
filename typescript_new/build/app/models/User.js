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
var Addess_1 = require("./Addess");
var PasswordUtil_1 = require("../../util/PasswordUtil");
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.hashPassword = function () {
        this.password = PasswordUtil_1.default.hashPassword(this.password);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 255, unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint', default: 1 }),
        __metadata("design:type", Number)
    ], User.prototype, "level", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 255, default: 'default.jpg' }),
        __metadata("design:type", String)
    ], User.prototype, "avatar", void 0);
    __decorate([
        typeorm_1.Column({ type: 'datetime' }),
        __metadata("design:type", String)
    ], User.prototype, "bornDate", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return Addess_1.Address; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Addess_1.Address)
    ], User.prototype, "address", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({
            type: 'timestamp',
            onUpdate: 'CURRENT_TIMESTAMP',
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], User.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "hashPassword", null);
    User = __decorate([
        typeorm_1.Entity({ name: 'users' })
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map