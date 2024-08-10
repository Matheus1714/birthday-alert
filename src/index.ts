require("dotenv").config();

import { scheduleJob } from "node-schedule";
import { main } from "./main";

scheduleJob("0 0 0 1 * *", async () => {
  await main("NOTIFY_BEGINNIG_MONTH");
});

scheduleJob("0 0 0 * * 0", async () => {
  await main("NOTIFY_NEXT_WEEK");
});

scheduleJob("0 0 0 * * *", async () => {
  await main("NOTIFY_TODAY");
});
