import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import User from "../models/user.model";

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { token, user } = await authService.login(username, password);
    res.cookie("auth", token).json({ isAuth: true, user });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    return;
  }
};

// Register controller
export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, user });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await authService.logout(req.user as User, req.token as string);
    res.clearCookie("auth").json({ success: true });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    return;
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const profile = await authService.getProfile(req.user as User);
    res.json({ isAuth: true, profile });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    return;
  }
};
