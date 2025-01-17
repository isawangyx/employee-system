"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
const path_1 = __importDefault(require("path"));
const employee_model_1 = __importDefault(require("../models/employee.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const department_model_1 = __importDefault(require("../models/department.model"));
const sequelize = new sequelize_typescript_1.Sequelize({
    ...config_1.default.getDatabaseConfig(),
    dialect: "postgres",
    models: [path_1.default.resolve(__dirname + "../models")],
});
sequelize.addModels([employee_model_1.default, user_model_1.default, department_model_1.default]);
exports.default = sequelize;
