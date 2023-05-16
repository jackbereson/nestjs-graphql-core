import { Workbook } from "exceljs";
import { Response } from "express";
import fs from "fs";
import _ from "lodash";
import path from "path";

export class UtilsHelper {
  constructor() {}
  static responseExcel(res: Response, workBook: Workbook, filename = "baocao") {
    res.status(200);
    res.setHeader(
      "Content-type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-disposition",
      `attachment; filename=${filename.replace(/\ /g, "-")}.xlsx`
    );
    workBook.xlsx.write(res).then(res.end);
  }
  
  static parsePhone(phone: string, pre: string) {
    if (!phone) return phone;
    let newPhone = "" + phone;
    newPhone = newPhone
      .replace(/^\+84/i, pre)
      .replace(/^\+0/i, pre)
      .replace(/^0/i, pre)
      .replace(/^84/i, pre);

    return newPhone;
  }

  static isEmail(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  static parseObjectWithInfo(params: { object: any; info: any }) {
    const { info, object } = params;
    let encodeData = JSON.stringify(object);
    encodeData = this.parseStringWithInfo({ data: encodeData, info });
    try {
      return JSON.parse(encodeData);
    } catch (err) {
      return object;
    }
  }
  static parseStringWithInfo(params: { data: string; info: any }) {
    const { data, info } = params;
    let messageText = "" + data;
    const stringRegex = /{{(.*?)}}/g;
    messageText = messageText.replace(stringRegex, (m: any, field: string) => {
      let data = _.get(info, field.trim());
      if (_.isString(data) || _.isNumber(data)) {
        data = JSON.stringify(data)
          .replace(/\\n/g, "\\n")
          .replace(/\\'/g, "\\'")
          .replace(/\\"/g, '\\"')
          .replace(/\\&/g, "\\&")
          .replace(/\\r/g, "\\r")
          .replace(/\\t/g, "\\t")
          .replace(/\\b/g, "\\b")
          .replace(/\\f/g, "\\f")
          .replace(/^\"(.*)\"$/g, "$1");
      } else if (_.isObject(data) || _.isBoolean(data)) {
        data = `<<Object(${JSON.stringify(data)})Object>>`;
      }
      return data || "";
    });
    return messageText.replace(
      /\:\"(?: +)?<<Object\((true|false|[\{|\[].*?[\}|\]])\)Object>>(?: +)?\"/g,
      ":$1"
    );
  }
  static timeZoneCode: string = "Asia/Ho_Chi_Minh";
  static getColor = () => colors[random(0, colors.length - 1)];
}

const colors = ["pink", "red", "orange", "amber", "blue", "green", "teal", "purple", "rose"];
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
