require("dotenv").config();

import { transporter } from "../services/nodemailer";
import { SendMailOptions } from "nodemailer";
import fs from "node:fs";
import path from "node:path";

type HtmlTemplate = {
  [key: string]: { file: `${string}.html`; subject: string };
};

const htmlTemplates: HtmlTemplate = {
  NOTIFY_BEGINNIG_MONTH: {
    file: "notify-beginning-month.html",
    subject: "Aniversariantes do Mês",
  },
};

export class EmailNotification {
  private mailOptions: SendMailOptions = {
    from: process.env.ADMIN_EMAIL,
  };

  getHTMLContent(fileHTML: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const basePath = path.resolve(__dirname, "..", "..");
      const filePath = path.join(basePath, "src", "html", fileHTML);

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async notifyBirthdaysInMonth(to: string[]) {
    const htmlContent = await this.getHTMLContent(
      htmlTemplates.NOTIFY_BEGINNIG_MONTH.file
    );

    if (!htmlContent) return;

    transporter.sendMail(
      {
        ...this.mailOptions,
        to,
        subject: htmlTemplates.NOTIFY_BEGINNIG_MONTH.subject,
        html: htmlContent,
      },
      (error, info) => {
        if (error) {
          console.error("Erro:", error);
        }
        console.log("E-mail enviado: " + info.response);
      }
    );
  }
}
