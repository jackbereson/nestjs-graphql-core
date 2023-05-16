import { configs } from "../configs";
import jwt from "jsonwebtoken";
import { ROLES } from "../decorators/roles.decorator";

export interface IPayloadToken {
  role: string;
  [name: string]: any;
}

export class TokenHelper {
  constructor() { }

  static generateToken(payload: IPayloadToken): string {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });
  }

  static decodeToken(token: string) {
    console.log('process.env.SECRET',process.env.SECRET)
    return jwt.verify(token, process.env.SECRET);
  }

  static getAdministratorToken() {
    return this.generateToken({
      role: ROLES.ADMIN,
    });
  }
}
