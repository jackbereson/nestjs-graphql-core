import { ErrorHelper } from "../helpers/error.helper";
import { Context } from "./context";

/**
 * * Authentication Helper
 * * 💊💊💊 valid auth
 * * 💊💊💊 valid role and auth
 * * 💊💊💊 valid _id and auth
 */
export class AuthHelper {
  constructor() {}

  /**
   * * 💊💊💊 Valid role with Roles and return nothing if unauthorized.
   * @param context
   * @param roles
   * @returns
   * TODOs : use in query - resolver funtion
   */
  static acceptRoles(context: Context, roles: String[]) {
    if (!context.isAuth) throw ErrorHelper.unauthorized();
    if (roles.indexOf(context.tokenData.role) !== -1) {
      return;
    } else {
      if (context.isTokenExpired) throw ErrorHelper.tokenExpired();
      throw ErrorHelper.permissionDeny();
    }
  }

  /**
   * * 💊💊💊 Valid context and return nothing if unauthorized.
   * @param context
   * @param throwError
   * @returns
   */
  static checkValidAuth(context: Context, throwError = true) {
    if (context.isTokenExpired) {
      if (!throwError) return false;
      throw ErrorHelper.tokenExpired();
    }
    if (!context.isAuth) {
      if (!throwError) return false;
      throw ErrorHelper.unauthorized();
    }
    return true;
  }

  /**
   * * 💊💊💊 check owner by _id and return nothing if unauthorized.
   * @param context
   * @param _id
   * @param throwError
   * @returns
   */
  static isOwner(context: Context, _id: string, throwError = true) {
    const validAuth = this.checkValidAuth(context, throwError);
    if (!validAuth) return false;
    if (context.tokenData!._id.toString() != _id.toString()) {
      if (!throwError) return false;
      throw ErrorHelper.permissionDeny();
    }
    return true;
  }
}
