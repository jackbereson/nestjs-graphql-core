import { configs } from "../configs";
import { ROLES } from "../decorators/roles.decorator";

export interface IPayloadToken {
  role: string;
  [name: string]: any;
}

export class TokenHelper {
  jwt: any;
  constructor(_jwt) {
    this.jwt = _jwt
  }

  generateToken(payload: IPayloadToken): string {
    return this.jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });
  }

  decodeToken(token: string) {
    console.log('decodeToken ------- jwt', this.jwt)
    return this.jwt.verify(token, process.env.SECRET);
  }

  getAdministratorToken() {
    return this.generateToken({
      role: ROLES.ADMIN,
    });
  }
}
