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
