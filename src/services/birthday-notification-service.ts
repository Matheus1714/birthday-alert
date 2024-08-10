import { EmailNotification } from "../models/email-notification";

type TemplateContent = {
  file: HtmlFile;
  subject: string;
  content: { format: string };
};

export type Template =
  | "NOTIFY_BEGINNIG_MONTH"
  | "NOTIFY_TODAY"
  | "NOTIFY_NEXT_WEEK";

type HtmlTemplate = {
  [key in Template]: TemplateContent;
};

const htmlTemplates: HtmlTemplate = {
  NOTIFY_BEGINNIG_MONTH: {
    file: "notify-beginning-month.html",
    subject: "Aniversários do mês",
    content: {
      format: "<li>{{name}} faz {{age}} anos no dia {{day}}</li>",
    },
  },
  NOTIFY_TODAY: {
    file: "notify-today.html",
    subject: "Aniversários de hoje",
    content: {
      format: "<li>{{name}} faz {{age}} anos hoje</li>",
    },
  },
  NOTIFY_NEXT_WEEK: {
    file: "notify-next-week.html",
    subject: "Aniversários da próxima semana",
    content: {
      format: "<li>{{name}} faz {{age}} anos semana que vem</li>",
    },
  },
};

export class BirthdayNotificationService extends EmailNotification {
  buildContent(content: string, params: { [key: string]: string | number }) {
    const keys = Object.keys(params);

    return keys.reduce(
      (acc, key) => acc?.replace(`{{${key}}}`, String(params[key])),
      content
    );
  }

  async notifyBirthdaysWithTemplate(
    to: string[],
    metadata: { [key: string]: string | number }[],
    month: string,
    template: Template
  ) {
    const html = await this.getHTMLContent(htmlTemplates[template].file);

    if (!html) return;

    const people = metadata.length
      ? metadata
          .map((data) =>
            this.buildContent(htmlTemplates[template].content.format, {
              ...data,
            })
          )
          .join("")
      : "";

    const htmlBody = this.buildContent(html, { month, people });

    this.sendEmailFromHtmlTemplate(
      to,
      htmlTemplates[template].subject,
      htmlBody
    );
  }
}
