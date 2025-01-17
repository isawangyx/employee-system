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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const department_model_1 = __importDefault(require("./department.model"));
const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key
let User = class User extends sequelize_typescript_1.Model {
    // Compare password for login
    async comparePassword(inputPassword) {
        return await bcryptjs_1.default.compare(inputPassword, this.password);
    }
    // Generate JWT token
    generateToken() {
        const payload = { id: this.id, departmentId: this.departmentId };
        return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    }
    // Verify JWT token and find user
    static async findByToken(token, cb) {
        const user = this;
        jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
            if (err)
                return cb(err, null);
            // Find user by ID
            user
                .findOne({ where: { id: decoded.id } })
                .then((foundUser) => cb(null, foundUser))
                .catch((findErr) => cb(findErr, null));
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => department_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], User.prototype, "departmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => department_model_1.default),
    __metadata("design:type", department_model_1.default)
], User.prototype, "department", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "users",
        modelName: "User",
    })
], User);
exports.default = User;
