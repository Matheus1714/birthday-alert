export class BirthdayData {
  format(values: unknown[][]) {
    if (!values || !values?.length || !values[0]?.length) return [];

    const people: { name: string; birthday: Birthday }[] = [];

    values.forEach((row) => {
      const date = new Date(`${row.at(3)}-${row.at(2)}-${row.at(1)}`);

      if (isNaN(Number(date))) return;

      const name = String(row.at(0));
      const day = Number(row.at(1));
      const month = Number(row.at(2)) as Month | undefined;
      const year = Number(row.at(3));

      people.push({
        name,
        birthday: { day, month: month as Month, year },
      });
    });

    return people;
  }
}
