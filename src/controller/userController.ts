import userService from "service/service.js";
import { Request, Response, NextFunction } from "express";

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newUser = await userService.create(req.body);
      res.status(201).json({
        status: "success",
        data: newUser,
      });
    } catch (error) {
      console.log("message from controller", error.message);
      next(error);
    }
  }

  async createSession(req: Request, res: Response, next: NextFunction) {
    try {
      const newSession = await userService.session(req.body);
      res.status(200).json({
        token: newSession,
        validity: "30d",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();

export default userController;
