require("dotenv").config();

import { scheduleJob } from "node-schedule";

import { Person, BirthdayCases } from "./models/person";
import { EmailNotification } from "./models/email-notification";
import { getDataFromGoogleSheets } from "./get-data-from-google-sheets";
import { monthsMap } from "./constants/month";

const job = scheduleJob("0 0 0 1 * *", async () => {
  const data = await getDataFromGoogleSheets();
  const today = new Date();
  const currentMonth = monthsMap[today.getMonth() + 1];

  const people = data.map((p) => new Person(p.name, p.birthday));

  const metadata = people
    .filter((person) => person.hasBirthday(BirthdayCases.IN_THIS_MONTH))
    .map((person) => ({
      name: person.name,
      day: person.birthday.day,
      age: person.age,
    }));

  const emailNotification = new EmailNotification();

  emailNotification.notifyBirthdaysInMonth(
    [process.env.ADMIN_EMAIL],
    metadata,
    currentMonth
  );
});
