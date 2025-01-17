import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

interface AuthenticatedRequest extends Request {
  user?: User;
  departmentId?: number;
}

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) : Promise<void> => {
  // Retrieve token from cookies
  const token = req.cookies?.auth;
  if (!token) {
    res.status(401).json({ error: true, message: "No token provided!" });
    return;
  }

  // Find user by token
  User.findByToken(token, (err, user) => {
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

    // Attach user and token to the request object
    req.user = user;
    req.departmentId = user.departmentId;
    next(); // Proceed to the next middleware or route handler
  });
};
