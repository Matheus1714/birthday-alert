require("dotenv").config();

import path from "node:path";

import { transporter } from "../services/nodemailer";
import { SendMailOptions } from "nodemailer";
import { getFileContent } from "../utils/get-file-content";

type HtmlFile = `${string}.html`;

type HtmlTemplate = {
  [key: string]: { file: HtmlFile; subject: string };
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

  async getHTMLContent(fileHTML: HtmlFile): Promise<string | null> {
    const basePath = path.resolve(__dirname, "..", "..");
    const filePath = path.join(basePath, "src", "html", fileHTML);

    return await getFileContent(filePath);
  }

  async notifyBirthdaysInMonth(
    to: string[],
    metadata: { name: string; day: number; age: number }[],
    month: string
  ) {
    const htmlContent = await this.getHTMLContent(
      htmlTemplates.NOTIFY_BEGINNIG_MONTH.file
    );

    if (!htmlContent) return;

    const peopleHTMLList = metadata.length
      ? metadata
          .map(
            (data) =>
              `<li>${data.name} faz ${data.age} anos no dia ${data.day}</li>`
          )
          .join("")
      : `<li>Nunhuma pessoa faz aniversário esse mês</li>`;

    const htmlBody = htmlContent
      ?.replace("{{month}}", month)
      ?.replace("{{people}}", peopleHTMLList);

    transporter.sendMail(
      {
        ...this.mailOptions,
        to,
        subject: htmlTemplates.NOTIFY_BEGINNIG_MONTH.subject,
        html: htmlBody,
      },
      (error, info) => {
        if (error) {
          console.error("Erro:", error);
        } else {
          console.log("Operação finalizada - " + info.response);
        }
      }
    );
  }
}
