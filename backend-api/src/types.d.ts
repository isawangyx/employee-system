import { Request } from "express";
import User from "./models/user.model"; // Adjust the import path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: User; // Extend the Request type to include user
      token?: string; // Extend the Request type to include token
    }
  }
}
