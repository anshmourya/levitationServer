import { Request, Response, NextFunction } from "express";
import { token } from "service/service.js";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "Token is not present.",
        message: "you are not signed in.",
      });
    }

    await token.verifyToken(authHeader);
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
