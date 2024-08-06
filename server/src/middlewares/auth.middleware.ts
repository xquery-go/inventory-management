import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model";
import { Role } from "../types/type";

interface AuthRequest extends Request {
  user?: IUser;
}

export const verifyAuth = (roles: Role[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return next(new Error("Unauthorized Access"));
      }

      const payload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as jwt.JwtPayload;

      const user = await User.findById(payload?._id).select("-password");

      if (!user) return next(new Error("Unauthorized Access"));
      if (!roles.includes(user.role as Role))
        return next(new Error("Unauthorized Access"));

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      next(new Error("Authentication Error"));
    }
  };
};
