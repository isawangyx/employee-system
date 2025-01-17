"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmployee = void 0;
const joi_1 = __importDefault(require("joi"));
const validateEmployee = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        salary: joi_1.default.number().required(),
        departmentId: joi_1.default.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ errorMessage: error.details[0].message });
    }
    else {
        next();
    }
};
exports.validateEmployee = validateEmployee;
