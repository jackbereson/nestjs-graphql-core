import { Request } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import _, { get } from "lodash";


import { TokenHelper } from "../helpers/token.helper";
import { ROLES } from "../decorators/roles.decorator";
import { AuthHelper } from "./auth.helper";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

export type TokenData = {
  role: string;
  _id: string;
  [name: string]: any;
};
export type SignedRequestPayload = {
  psid: string;
  algorithm: string;
  thread_type: string;
  tid: string;
  issued_at: number;
  page_id: number;
};

/**
 * * Context for Header API
 * * 💊💊💊 parse all header params
 * * 💊💊💊 get all header params
 */

@Injectable()
export class Context {
  req: Request;
  isAuth = false;
  isTokenExpired = false;
  tokenData: TokenData;
  passwordToken: string; // password signup - signin - md5
  recoveryToken: string; // recover token
  userToken: string; // user token
  shopToken: string; // shop token
  referralToken: string; // referral token
  sigToken: string;// signnonce token

  constructor(params: { req?: Request; connection?: any }, private readonly jwtService?: JwtService) {
    this.req = params.req;
    this.parseFakeToken(params);
    this.getSigToken(params);
  }

  isAdmin() {
    return get(this.tokenData, "role") == ROLES.ADMIN;
  }
  isCustomer() {
    return get(this.tokenData, "role") == ROLES.CUSTOMER;
  }
  get id() {
    return get(this.tokenData, "_id");
  }
  get ua() {
    return get(this, "req.headers.user-agent");
  }
  get ip() {
    return get(this, "req.headers.x-forwarded-for") || get(this, "req.headers.remoteAddress");
  }


  getSigToken(params: any) {
    try {
      const { req } = params;
      this.sigToken = _.get(req, "headers.s-token");
    } catch (err) {
      // console.log('err', err);
    }
  }

  async parseFakeToken(params) {
    // console.log('jwt', this.jwtService)
    try {
      const { req, connection } = params;
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQ1VTVE9NRVIiLCJfaWQiOiI2MzJiMTdhOGRhMzFlNTM2ZGJhNjg5YjMiLCJzdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE2ODQyNTQ3MjIsImV4cCI6MTY4NDM0MTEyMn0.gjeaIpgDfZ6M9M5ofwoB3ruJAtjwhbE9qfbK1rJ6Q_o";
      const tokenHelper = new TokenHelper(this.jwtService)

      if (token) {
        const decodedToken: any = await tokenHelper.decodeToken(token);
        this.isAuth = true;
        console.log('decodedToken', decodedToken)
        this.tokenData = decodedToken;
      }

    } catch (err) {
      console.log('err', err);
      if (err instanceof TokenExpiredError) {
        this.isTokenExpired = true;
      }
      this.isAuth = false;
    } finally {
      return this;
    }
  }

  parseToken(params) {
    // console.log('params', params)
    // console.log('jwt', this.jwtService)
    try {
      const { req, connection } = params;
      let token = null;

      const tokenHelper = new TokenHelper(this.jwtService)

      if (req) {
        this.req = req;
        token = _.get(req, "headers.x-token") || _.get(req, "query.x-token");
      }

      // if (connection && connection.context) {
      //   token = connection.context["x-token"];
      // }

      if (token) {
        const decodedToken: any = tokenHelper.decodeToken(token);
        this.isAuth = true;
        this.tokenData = decodedToken;
      }

    } catch (err) {
      console.log('err', err);
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