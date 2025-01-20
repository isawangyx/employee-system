"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const auth = async (req, res, next) => {
    var _a;
    // Retrieve token from cookies
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    console.log("Token:", token);
    if (!token) {
        res.status(401).json({ error: true, message: "No token provided!" });
        return;
    }
    // Find user by token
    user_model_1.default.findByToken(token, (err, user) => {
        if (err) {
            return res
                .status(500)
                .json({ error: true, message: "Internal server error" });
        }
        if (!user) {
            return res
                .status(401)
                .json({ error: true, message: "Invalid token or user not found!" });
        }
        console.log("User found by token:", user);
        // Attach user and token to the request object
        req.user = user;
        req.departmentId = user.departmentId;
        next(); // Proceed to the next middleware or route handler
    });
};
exports.auth = auth;
