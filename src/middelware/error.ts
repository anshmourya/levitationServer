import { Request, Response, NextFunction } from "express";

const error = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.name || "InternalServerError";
  const code = err.code || 400;
  const message = err.message || "Something went wrong";
  const detail = err || "Backend error";
  res.status(400).json({
    status,
    message,
    detail,
  });
};

export default error;
