import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler";

export interface AuthenticatedRequest extends Request {
  userId?: number;
  user?: any;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(401, "No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.userId = (decoded as any).userId;
    next();
  } catch (error) {
    throw new AppError(401, "Invalid or expired token");
  }
};
