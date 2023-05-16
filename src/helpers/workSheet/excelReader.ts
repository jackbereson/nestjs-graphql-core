import { Workbook } from "exceljs";
import _ from "lodash";
import csv from "csv-parser";
import { ErrorHelper } from "../error.helper";

export const getDataFromExcelStream = async (stream: any) => {
  const workbook = new Workbook();
  const streamWorkBook = await workbook.xlsx.read(stream);
  const worksheet = streamWorkBook.getWorksheet("Sheet1");
  const data = worksheet.getSheetValues();
  return data;
};

export const getJsonFromCSVStream = (stream: any) => {
  return new Promise((resolve, reject) => {
    var result: any = [];
    stream
      .pipe(csv({}))
      .on("data", (data: any) => result.push(data))
      .on("end", () => {
        resolve(result);
      });
  });
};

export const modifyExcelData = (
  result: any[],
  headerData: any[]
) => {
  // Cast type unknown to any
  let dataImport = <any[]>result;
  // console.log('dataImport', dataImport);
  // Kiểm tra dữ liệu
  if (dataImport.length == 0)
    throw ErrorHelper.requestDataInvalid("File import không có dữ liệu");

  let excelHeaders = <any[]>result;
  [, excelHeaders] = dataImport;

  excelHeaders.shift();

  for (let i = 0; i < excelHeaders.length; i++) {
    const head = excelHeaders[i];
    if (head != headerData[i]) {
      throw ErrorHelper.requestDataInvalid("File import không hợp lệ");
    }
  }

  // Kiểm tra cột dữ liệu

  dataImport.shift();
  dataImport.shift();
  // console.log('excelHeader', excelHeaders);
  // console.log('dataImport', dataImport);

  let dataResult: any[] = [];
  let dataError: any[] = [];
  for (let index = 0; index < dataImport.length; index++) {
    const row = dataImport[index];
    // console.log('row',row);
    if (!row) {
      dataError.push({
        line: index + 1,
        success: false,
        error: "Dòng này không có dữ liệu",
      });
      continue;
    }

    //check end of file csv
    let item: any = {};

    for (let i = 0; i < headerData.length; i++) {
      const col = headerData[i];
      const value = row[i + 1];
      if (value) {
        item[col] = value.toString().trim();
      }
    }

    // console.log('test')
    // kiem tra dòng đó có rỗng ko ?
    if (_.isEmpty(item)) {
      dataError.push({
        line: index + 1,
        success: false,
        error: "Dòng này không có dữ liệu",
      });
      continue;
    } 
    dataResult.push({ ...item, line: index + 1 });
  }
  // console.log('=========>dataResult', dataResult);
  // console.log('=========>dataError', dataError);
  return [dataResult, dataError];
};

export const modifyCSVData = (result: any[], headerData: any[]) => {
  // Cast type unknown to any
  const dataImport = <any[]>result;
  // Kiểm tra dữ liệu
  if (dataImport.length == 0)
    throw ErrorHelper.requestDataInvalid("File import không có dữ liệu");
  // Kiểm tra cột dữ liệu
  let importHeaders = headerData;
  if (
    Object.keys(dataImport[0]).toString().trim().replace(/,/g, "") !=
    importHeaders.toString().trim().replace(/,/g, "")
  ) {
    throw ErrorHelper.requestDataInvalid("File import không hợp lệ");
  }
  importHeaders = Object.keys(dataImport[0]);

  // Hàm xử lí kết quả từ file csv
  const dataResult: any[] = [];
  for (const m of dataImport) {
    //check end of file csv
    if (m[importHeaders[1]] == "" || !m[importHeaders[1]]) {
      break;
    }
    dataResult.push(m);
  }
  return dataResult;
};
