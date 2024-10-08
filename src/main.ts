require("dotenv").config();

import { Person, BirthdayCases } from "./models/person";
import {
  BirthdayNotificationService,
  type Template,
} from "./services/birthday-notification-service";
import { monthsMap } from "./constants/month";
import { DataService } from "./services/data-service";

const birthdayMap: { [key in Template]: BirthdayCases } = {
  NOTIFY_BEGINNIG_MONTH: BirthdayCases.IN_THIS_MONTH,
  NOTIFY_NEXT_WEEK: BirthdayCases.NEXT_WEEK,
  NOTIFY_TODAY: BirthdayCases.TODAY,
};

export async function main(
  notificationCase:
    | "NOTIFY_BEGINNIG_MONTH"
    | "NOTIFY_TODAY"
    | "NOTIFY_NEXT_WEEK"
) {
  const dataService = new DataService();
  const data =
    process.env.ENVIROMENT === "local"
      ? await dataService.getDataFromLocalSheets()
      : await dataService.getDataFromGoogleSheets();

  const today = new Date();
  const currentMonth = monthsMap[today.getMonth() + 1];

  const people = data.map((p) => new Person(p.name, p.birthday));

  const metadata = people
    .filter((person) => person.hasBirthday(birthdayMap[notificationCase]))
    .map((person) => ({
      name: person.name,
      day: person.birthday.day,
      age: person.age,
    }));

  const service = new BirthdayNotificationService();

  service.notifyBirthdaysWithTemplate(
    [process.env.ADMIN_EMAIL],
    metadata,
    currentMonth,
    notificationCase
  );
}
