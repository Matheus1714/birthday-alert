require("dotenv").config();

import path from "node:path";

import { transporter } from "../libs/nodemailer";
import { SendMailOptions } from "nodemailer";
import { getFileContent } from "../utils/get-file-content";

export class EmailNotification {
  private mailOptions: SendMailOptions = {
    from: process.env.ADMIN_EMAIL,
  };

  async getHTMLContent(fileHTML: HtmlFile): Promise<string | null> {
    const basePath = path.resolve(__dirname, "..", "..");
    const filePath = path.join(basePath, "src", "html", fileHTML);

    return await getFileContent(filePath);
  }

  sendEmailFromHtmlTemplate(to: string[], subject: string, html: string) {
    transporter.sendMail(
      {
        ...this.mailOptions,
        to,
        subject,
        html,
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
