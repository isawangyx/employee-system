"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.logout = exports.register = exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token, user } = await authService.login(username, password);
        res.cookie("auth", token).json({ isAuth: true, user });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
        return;
    }
};
exports.login = login;
// Register controller
const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ success: true, user });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
        return;
    }
};
exports.register = register;
const logout = async (req, res) => {
    try {
        await authService.logout(req.user, req.token);
        res.clearCookie("auth").json({ success: true });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        return;
    }
};
exports.logout = logout;
const profile = async (req, res) => {
    try {
        const profile = await authService.getProfile(req.user);
        res.json({ isAuth: true, profile });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        return;
    }
};
exports.profile = profile;
