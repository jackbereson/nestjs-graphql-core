import _ from "lodash";
import { Cell, Row, ValueType, Workbook, Worksheet } from "exceljs";
import { CellRange } from "./cell-range";
import { UtilsHelper } from "../utils.helper";

/**
 * Callback for iterate cells
 * @return false - whether to break iteration
 */
export type iterateCells = (cell: Cell) => void | false;

export class WorkSheetHelper {
  constructor(private worksheet: Worksheet) {}

  public get workbook(): Workbook {
    return this.worksheet.workbook;
  }

  get sheetName() {
    return this.worksheet.name;
  }

  public parseSheet(info: any, sheet?: Worksheet) {
    if (!sheet) sheet = this.worksheet;
    const cells = this.getSheetValueCell(sheet);
    cells.forEach((c) => this.parseCell(c, info));
  }
  public parseRange(cellRange: CellRange, info: any, sheet?: Worksheet) {
    if (!sheet) sheet = this.worksheet;
    this.eachValueCell(cellRange, (c) => this.parseCell(c.master, info), sheet);
  }
  public eachValueCell(cellRange: CellRange, callback: iterateCells, sheet?: Worksheet) {
    if (!sheet) sheet = this.worksheet;
    const mergeCells: any = {};
    this.eachCell(
      cellRange,
      (c) => {
        if (c.isMerged) {
          if (mergeCells[c.master.address]) return;
          callback(c);
          mergeCells[c.master.address] = c.master;
        } else {
          callback(c);
        }
      },
      sheet
    );
  }
  public getSheetValueCell(sheet?: Worksheet) {
    if (!sheet) sheet = this.worksheet;
    const data: Cell[] = [];
    const mergedCells: Cell[] = [];
    sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      row.eachCell((c, cellNumber) => {
        if (c.isMerged && mergedCells.find((cell) => c.isMergedTo(cell))) return;
        data.push(c);
        if (c.isMerged) mergedCells.push(c);
      });
    });
    return data;
  }

  public cloneSheetWidth(sheetDest: Worksheet) {
    this.worksheet.columns.forEach((c, index) => {
      sheetDest.getColumn(index + 1).width = c.width;
    });
  }

  // public addImage(fileName: string, cell: Cell): void {
  //   const imgId = this.workbook.addImage({
  //     filename: fileName,
  //     extension: "jpeg",
  //   });

  //   const cellRange = this.getMergeRange(cell);
  //   if (cellRange) {
  //     this.worksheet.addImage(imgId, {

  //       tl: { col: cellRange.left - 0.99999, row: cellRange.top - 0.99999 },
  //       br: { col: cellRange.right, row: cellRange.bottom },
  //     });
  //   } else {
  //     this.worksheet.addImage(imgId, {
  //       tl: { col: +cell.col - 0.99999, row: +cell.row - 0.99999 },
  //       br: { col: +cell.col, row: +cell.row },
  //     });
  //   }
  // }

  public removeRows(startRowNumber: number, line: number) {
    const lastRow = this.getSheetDimension().bottom;
    for (let rowNumber = startRowNumber + line; rowNumber <= lastRow; rowNumber++) {
      const rowSrc = this.worksheet.getRow(rowNumber);
      const rowDest = this.worksheet.getRow(rowNumber - line);
      this.moveRow(rowSrc, rowDest);
    }
  }

  public cloneRows(srcRowStart: number, srcRowEnd: number, countClones: number = 1): void {
    const countRows = srcRowEnd - srcRowStart + 1;
    const dxRow = countRows * countClones;
    const lastRow = this.getSheetDimension().bottom + dxRow;

    // Move rows below
    for (let rowSrcNumber = lastRow; rowSrcNumber > srcRowEnd; rowSrcNumber--) {
      const rowSrc = this.worksheet.getRow(rowSrcNumber);
      const rowDest = this.worksheet.getRow(rowSrcNumber + dxRow);
      this.clearRow(rowDest);
      this.moveRow(rowSrc, rowDest);
    }

    // Clone target rows
    for (let rowSrcNumber = srcRowEnd; rowSrcNumber >= srcRowStart; rowSrcNumber--) {
      const rowSrc = this.worksheet.getRow(rowSrcNumber);
      for (let cloneNumber = countClones; cloneNumber > 0; cloneNumber--) {
        const rowDest = this.worksheet.getRow(rowSrcNumber + countRows * cloneNumber);
        this.copyRow(rowSrc, rowDest);
      }
    }
  }

  public copyCellRange(
    rangeSrc: CellRange,
    rangeDest: CellRange,
    sheetSrc?: Worksheet,
    sheetDest?: Worksheet
  ): void {
    if (!sheetSrc) sheetSrc = this.worksheet;
    if (!sheetDest) sheetDest = this.worksheet;
    if (
      rangeSrc.countRows !== rangeDest.countRows ||
      rangeSrc.countColumns !== rangeDest.countColumns
    ) {
      console.warn(
        "WorkSheetHelper.copyCellRange",
        "The cell ranges must have an equal size",
        rangeSrc,
        rangeDest
      );
      return;
    }
    // todo: check intersection in the CellRange class
    const dRow = rangeDest.bottom - rangeSrc.bottom;
    const dCol = rangeDest.right - rangeSrc.right;
    this.eachCellReverse(
      rangeSrc,
      (cellSrc: Cell) => {
        const cellDest = sheetDest!.getCell(cellSrc.row + dRow, cellSrc.col + dCol);
        this.copyCell(cellSrc, cellDest, sheetSrc, sheetDest);
      },
      sheetSrc
    );
  }

  public getSheetDimension(): CellRange {
    const dm = (this.worksheet as any).dimensions["model"];
    return new CellRange(dm.top, dm.left, dm.bottom, dm.right);
  }

  /** Iterate cells from the left of the top to the right of the bottom */
  public eachCell(cellRange: CellRange, callBack: iterateCells, sheet?: Worksheet) {
    if (!sheet) sheet = this.worksheet;
    for (let r = cellRange.top; r <= cellRange.bottom; r++) {
      const row = sheet.findRow(r);
      if (row) {
        for (let c = cellRange.left; c <= cellRange.right; c++) {
          const cell = row.findCell(c);
          if (cell && cell.type !== ValueType.Merge) {
            if (callBack(cell) === false) {
              return;
            }
          }
        }
      }
    }
  }

  /** Iterate cells from the right of the bottom to the top of the left */
  public eachCellReverse(cellRange: CellRange, callBack: iterateCells, sheet?: Worksheet) {
    if (!sheet) sheet = this.worksheet;
    for (let r = cellRange.bottom; r >= cellRange.top; r--) {
      const row = sheet.findRow(r);
      if (row) {
        for (let c = cellRange.right; c >= cellRange.left; c--) {
          const cell = row.findCell(c);
          if (cell && cell.type !== ValueType.Merge) {
            if (callBack(cell) === false) {
              return;
            }
          }
        }
      }
    }
  }

  private getMergeRange(cell: Cell, sheet?: Worksheet) {
    if (!sheet) sheet = this.worksheet;
    if (cell.isMerged && Array.isArray((sheet as any).model["merges"])) {
      const address = cell.type === ValueType.Merge ? cell.master.address : cell.address;
      const cellRangeStr = (sheet as any).model["merges"].find((item: string) =>
        item.startsWith(address + ":")
      );
      if (cellRangeStr) {
        const [cellTlAdr, cellBrAdr] = cellRangeStr.split(":", 2);
        return CellRange.createFromCells(sheet.getCell(cellTlAdr), sheet.getCell(cellBrAdr));
      }
    }
    return null;
  }

  private moveRow(rowSrc: Row, rowDest: Row): void {
    this.copyRow(rowSrc, rowDest);
    this.clearRow(rowSrc);
  }

  private copyRow(rowSrc: Row, rowDest: Row): void {
    /** @var {RowModel} */
    if (rowSrc.model) {
      const rowModel = _.cloneDeep(rowSrc.model);
      rowModel.number = rowDest.number;
      rowModel.cells = [];
      rowDest.model = rowModel;
      const cellRangeDest: any = {};
      for (let colNumber = this.getSheetDimension().right; colNumber > 0; colNumber--) {
        const cell = rowSrc.getCell(colNumber);
        const newCell = rowDest.getCell(colNumber);
        const regex = new RegExp(cell.address);
        const range = (this.worksheet.model as any).merges.find((m: string) => regex.test(m));

        if (!cellRangeDest[range]) {
          const cellRange = this.getMergeRange(cell);
          if (cellRange) {
            const dRow = Number(newCell.row) - Number(cell.row);
            const dCol = Number(newCell.col) - Number(cell.col);
            cellRange.move(dRow, dCol);
            cellRangeDest[range] = cellRange;
          }
        }
        this.copyCell(cell, newCell);
      }
      _.forEach(cellRangeDest, (cellRange) => {
        try {
          this.worksheet.mergeCells(
            cellRange.top,
            cellRange.left,
            cellRange.bottom,
            cellRange.right
          );
        } catch (err) {
          // console.log('err', err.message);
        }
      });
    }
  }

  private parseCell(cell: Cell, info: any) {
    if (typeof cell.value == "string") {
      const value = UtilsHelper.parseStringWithInfo({ data: cell.value, info });
      if (_.isEmpty(value)) {
        cell.value = "";
      } else {
        cell.value = _.isNaN(Number(value)) ? value : Number(value);
        if (_.startsWith(cell.value.toString(), "=")) {
          cell.value = { formula: cell.value.toString().substr(1) } as any;
        }
      }
    }
  }

  private copyCell(
    cellSrc: Cell,
    cellDest: Cell,
    sheetSrc?: Worksheet,
    sheetDest?: Worksheet
  ): void {
    if (!sheetSrc) sheetSrc = this.worksheet;
    if (!sheetDest) sheetDest = this.worksheet;
    // skip submerged cells
    if (cellSrc.isMerged && cellSrc.type === ValueType.Merge) {
      return;
    }
    // console.log('copyCell', cellSrc.address);
    /** @var {CellModel} */
    const storeCellModel = _.cloneDeep(cellSrc.model) as any;
    storeCellModel.address = cellDest.address;

    // // Move a merge range
    const cellRange = this.getMergeRange(cellSrc, sheetSrc);

    if (cellRange) {
      const dRow = Number(cellDest.row) - Number(cellSrc.row);
      const dCol = Number(cellDest.col) - Number(cellSrc.col);
      // const lastCellSrc = sheetSrc.getCell(cellRange.bottom, cellRange.left)
      // console.log(lastCellSrc.value, lastCellSrc.style);
      cellRange.move(dRow, dCol);
      this.eachCell(
        cellRange,
        (c) => {
          c.style = storeCellModel.style;
          if (c.style.border && c.style.border.top && c.style.border.left) {
            c.style.border.right = c.style.border.top;
          }
        },
        sheetDest
      );

      // lastCellDest.style = lastCellSrc.style;
      try {
        sheetDest.mergeCells(cellRange.top, cellRange.left, cellRange.bottom, cellRange.right);
      } catch (err) {
        console.log("err", err.message);
      }
    }

    // Move an image
    this.worksheet.getImages().forEach((image) => {
      const rng = image.range;
      if (
        rng.tl.row <= +cellSrc.row &&
        rng.br.row >= +cellSrc.row &&
        rng.tl.col <= +cellSrc.col &&
        rng.br.col >= +cellSrc.col
      ) {
        rng.tl.row += +cellDest.row - +cellSrc.row;
        rng.br.row += +cellDest.row - +cellSrc.row;
      }
    });

    cellDest.model = storeCellModel;
    // console.log('cellDest.model', cellDest.model);
  }

  private clearRow(row: Row): void {
    // row.eachCell(c => {
    //   const cellRange = this.getMergeRange(c);
    //   if (cellRange) {
    //     this.worksheet.unMergeCells(
    //       cellRange.top,
    //       cellRange.left,
    //       cellRange.bottom,
    //       cellRange.right
    //     );
    //   }
    // });
    row.model = {
      cells: [],
      number: row.number,
      min: undefined,
      max: undefined,
      height: undefined,
      style: undefined,
      hidden: undefined,
      outlineLevel: undefined,
      collapsed: undefined,
    };
  }

  // private clearCell(cell: Cell): void {
  //   cell.model = {
  //     address: cell.fullAddress.address,
  //     style: undefined as any,
  //     type: undefined as any,
  //     text: undefined as any,
  //     hyperlink: undefined as any,
  //     value: undefined as any,
  //     master: undefined as any,
  //     formula: undefined as any,
  //     sharedFormula: undefined as any,
  //     result: undefined as any,
  //     comment: undefined as any
  //   };
  // }
}
