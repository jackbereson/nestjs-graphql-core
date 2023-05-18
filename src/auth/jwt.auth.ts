import { JwtService } from "@nestjs/jwt";
import { ROLES } from "../decorators/roles.decorator";
import * as dotenv from 'dotenv';

dotenv.config();

export interface IPayloadToken {
  role: string;
  [name: string]: any;
}

const jwt = new JwtService({
    global: true,
    secret: process.env.SECRET,
    signOptions: { expiresIn: '100d' },
  });

export class TokenHelper {

  static generateToken(payload: IPayloadToken): string {
    return jwt.sign(payload);
  }

  static decodeToken(token: string) {
    return jwt.verify(token);
  }

  static getAdministratorToken() {
    return this.generateToken({
      role: ROLES.ADMIN,
    });
  }
}
