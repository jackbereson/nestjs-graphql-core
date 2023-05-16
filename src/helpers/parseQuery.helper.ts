import { configs } from "../configs";
import _ from "lodash";
// import { Sequelize } from "../base/baseModel";

export interface IParseQuery {
  page?: number;
  limit?: number;
  offset?: number;
  order?: any;
  filter?: any;
  select?: any;
  search?: string;
}

export class ParseQueryHelper {
  static parseGetList(query: any = {}) {
    let options: IParseQuery = {};

    let paging = this.parsePagination(query);
    options.limit = paging.limit;
    options.offset = paging.offset;
    (options as any).pagination = paging;

    options.order = this.parseSort(query);

    // Filter
    options.filter = this.parseFilter(query);

    options = this.parseSearch(options, query);

    console.log(options);

    return options;
  }

  static parseSearch(options: IParseQuery, query: IParseQuery) {
    if (query.search) {
      query.search = query.search.trim() + " ";
      _.set(options, "filter.$text.$search", query.search);
      options.select = { score: { $meta: "textScore" } };
      options.order = { score: { $meta: "textScore" } };
    }

    return options;
  }

  // static parseInclude(query: IParseQuery) {
  //   let include: string[] = [];
  //   query.include = query.include || [];

  //   if (this.isString(query.include)) {
  //     include = JSON.parse(query.include || `[]`);
  //   } else {
  //     include = [...query.include];
  //   }

  //   let includeResult = [...include];

  //   return includeResult;
  // }

  static parseSort(query: IParseQuery) {
    return query.order || {};
  }

  static parseFilter(query: IParseQuery) {
    // const filter = JSON.parse(query.filter || "{}");
    return query.filter || {};
  }

  static parsePagination(query: IParseQuery) {
    const page = query.page || 1;
    const limit = query.limit || configs.query.limit;
    const offset = query.offset || (page - 1) * limit;

    return {
      limit,
      offset,
      page,
    };
  }

  // // static parseGetOne(query: any = {}) {
  // //   let options: FindOptions = {};

  // //   // let paging = this.parsePagination(query);
  // //   // options.limit = paging.limit;
  // //   // options.offset = paging.offset;
  // //   // (options as any).pagination = paging;

  // //   // options.order = this.parseSort(query);

  // //   // Filter
  // //   // options.where = this.parseFilter(query);

  // //   // Join Table
  // //   options.include = this.parseInclude(query);

  // //   return options;
  // // }

  // static isString(x: string) {
  //   return _.isString(x) && x !== undefined;
  // }
}
