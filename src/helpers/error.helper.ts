import { BaseErrorHelper, BaseError } from "../base/error.base";

export class ErrorHelper extends BaseErrorHelper {
  static userNotExist() {
    return new BaseError(403, "-103", "User does not exist.");
  }
  static userExisted() {
    return new BaseError(403, "-104", "User already exists.");
  }
  static userRoleNotSupported() {
    return new BaseError(401, "-105", "User is not authorized.");
  }
  static userError(message: string) {
    return new BaseError(403, "-106", "User error: " + message);
  }
  static duplicateError(key: string) {
    return new BaseError(403, "-107", `${key} has been duplicated.`);
  }
  static readOnlyError(key: string) {
    return new BaseError(403, "-108", `${key} read only.`);
  }
  static createUserError(message: string) {
    return new BaseError(401, "-109", `Creating user error: ${message}`);
  }
  static updateUserError(message: string) {
    return new BaseError(401, "-110", `Updating user error: ${message}`);
  }
  static userPasswordNotCorrect() {
    return new BaseError(403, "-111", `Incorrect password.`);
  }
  static farmerPinNotCorrect() {
    return new BaseError(403, "-112", `Pin code is incorrect`);
  }
  static deliveryStatusWrong() {
    return new BaseError(403, "-113", `Order status is incorrect`);
  }
  static notEnoughtPoint() {
    return new BaseError(403, "-114", "Account not enough points");
  }
  static spinError(message: string) {
    return new BaseError(403, "-115", message);
  }
  static invalidPin() {
    return new BaseError(403, "-116", "Pin code must be 6 digits");
  }
}
