import { Request } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import _ from "lodash";
import { AuthHelper } from "./auth";
import { decodeToken } from "./jwt.auth";
import { Injectable } from "@nestjs/common";
import { ROLES } from "../constants/role.const";

export type TokenData = {
  role: string;
  _id: string;
  [name: string]: any;
};

@Injectable()
export class Context {
  req: Request;
  isAuth = false;
  isTokenExpired = false;
  tokenData: TokenData;
  token: string;
  referralToken: string;
  sigToken: string;

  constructor(params: { req?: Request; connection?: any }) {
    this.req = params.req;
    this.parseToken(params);
    this.getSigToken(params);
  }

  isAdmin = () => this.tokenData?.role === ROLES.ADMIN;
  isCustomer = () => this.tokenData?.role === ROLES.CUSTOMER;
  isOperator = () => this.tokenData?.role === ROLES.OPERATOR;

  get id() { return this.tokenData?._id; }
  get ua() { return this.req?.headers["user-agent"]; }
  get ip() {
    return (
      this.req?.headers["x-forwarded-for"] ||
      this.req?.headers["remoteAddress"]
    );
  }

  getSigToken(params: any) {
    try {
      const { req } = params;
      this.sigToken = _.get(req, "headers.s-token");
    } catch (err) {
      // console.log('err', err);
    }
  }

  async parseToken(params) {
    try {
      const { req } = params;
      let token = null;

      if (req) {
        this.req = req;
        token = _.get(req, "headers.x-token") || _.get(req, "query.x-token");
      }

      if (token) {
        const decodedToken: any = await decodeToken(token);
        this.isAuth = true;
        this.token = token;
        this.tokenData = decodedToken;
      }
    } catch (err) {
      // console.log('err', err);
      if (err instanceof TokenExpiredError) {
        this.isTokenExpired = true;
      }
      this.isAuth = false;
    } finally {
      return this;
    }
  }

  auth(roles: string[]) {
    AuthHelper.acceptRoles(this, roles);
  }
}
