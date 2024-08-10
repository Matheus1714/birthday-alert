import { auth, googleSheets } from "./libs/google-sheets";

export async function getDataFromGoogleSheets(): Promise<
  { name: string; birthday: Birthday }[]
> {
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: process.env.GOOGLE_SHEET_RANGE,
  });

  const values = getRows.data.values;

  if (!values || !values?.length || !values[0]?.length) return [];

  const people: { name: string; birthday: Birthday }[] = [];

  values.forEach((row) => {
    const name = String(row.at(0));
    const day = Number(row.at(1));
    const month = Number(row.at(2)) as Month | undefined;
    const year = Number(row.at(3));

    const isNumeric = !day || !month || !year || month < 1;
    const isValidMonth = month ? month > 0 || month < 13 : false;

    if (!isNumeric || !isValidMonth) return;

    people.push({
      name,
      birthday: { day, month: month as Month, year },
    });
  });

  return people;
}
