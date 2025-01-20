"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    async register(userDetails) {
        const { username, password, departmentId } = userDetails;
        const existingUser = await user_model_1.default.findOne({ where: { username } });
        if (existingUser) {
            throw new Error("Username already exists");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await user_model_1.default.create({
            username,
            password: hashedPassword,
            departmentId,
        });
        return newUser;
    }
    async login(username, password) {
        const user = await user_model_1.default.findOne({ where: { username } });
        console.log(user);
        if (!user) {
            throw new Error("Auth failed, username not found");
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Password doesn't match");
        }
        const token = user.generateToken();
        await user.update({ token });
        console.log(token);
        return { token, user };
    }
    async logout(user, token) {
        await user.update({ token: "" });
    }
    async getProfile(user) {
        return {
            id: user.id,
            username: user.username,
            departmentId: user.departmentId,
        };
    }
}
exports.AuthService = AuthService;
