import { UserModel } from "@schema/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface userprop {
  name: string;
  email: string;
  password: string;
}

class Jwt {
  async createToken(user: { email: string }) {
    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    return token;
  }

  async verifyToken(token: string): Promise<jwt.JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.SECRET_KEY,
        (error, user: jwt.JwtPayload) => {
          if (error) reject(error);
          resolve(user);
        }
      );
    });
  }
}

//user class
class UserService extends Jwt {
  async create(newUser: userprop) {
    try {
      newUser.password = await bcrypt.hash(newUser.password, 10);
      await UserModel.create(newUser);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async session(signinUser: userprop) {
    try {
      const existUser = await UserModel.findOne({ email: signinUser.email });

      if (!existUser) {
        throw new Error("User does not exist.");
      }

      const isPasswordCorrect = await bcrypt.compare(
        signinUser.password,
        existUser.password
      );

      if (!isPasswordCorrect) {
        throw new Error("Incorrect password.");
      }

      return this.createToken({ email: signinUser.email });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const userService = new UserService();
export const token = new Jwt();
export default userService;
