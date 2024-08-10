require("dotenv").config();

import { BirthdayData } from "../models/birthday-data";
import { auth, googleSheets } from "../libs/google-sheets";
import XLSX from "xlsx";
import fs from "node:fs";

export class DataService extends BirthdayData {
  async getDataFromGoogleSheets(): Promise<
    { name: string; birthday: Birthday }[]
  > {
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: process.env.GOOGLE_SHEET_RANGE,
    });

    const values = getRows.data.values;

    return this.format(values!);
  }

  async getDataFromLocalSheets(): Promise<
    { name: string; birthday: Birthday }[]
  > {
    const fileBuffer = fs.readFileSync(process.env.XLSX_PATH);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    });

    console.log(data);

    return this.format(data as unknown[][]);
  }
}
