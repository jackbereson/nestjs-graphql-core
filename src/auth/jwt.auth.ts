import { JwtService } from "@nestjs/jwt";
import { ROLES } from "../decorators/roles.decorator";
import * as dotenv from "dotenv";
import { configs } from "../configs";

dotenv.config();

export interface IPayloadToken {
  role: string;
  [name: string]: any;
}

export const jwt = new JwtService({
  global: true,
  secret: configs.secretKey,
  signOptions: { expiresIn: configs.expiresIn },
});

export const generateToken = (payload: IPayloadToken): string => {
  return jwt.sign(payload);
};

export const decodeToken = (token: string) => {
  return jwt.verify(token);
};

export const getAdministratorToken = () => {
  return generateToken({
    role: ROLES.ADMIN,
  });
};
