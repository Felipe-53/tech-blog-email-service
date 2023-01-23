import SG from "@sendgrid/mail";
import assert from "assert";
import { findAllConfirmedRecipients } from "../../recipients/use-cases/FindAllConfirmedRecipients";
import { env } from "../../env";

SG.setApiKey(env.send_grid_api_key);

interface SendMailDTO {
  postTitle: string;
  postExcerpt: string;
  postLink: string;
}

export async function sendNewBlogPostEmail(request: SendMailDTO) {
  const { postTitle, postExcerpt, postLink } = request;

  const recipients = await findAllConfirmedRecipients.execute();
  const emails = [];

  for (const recipient of recipients) {
    emails.push({
      from: "felipeasbarbosa.dev@gmail.com",
      to: recipient.email.getValue(),
      templateId: "d-9c68fec05f8f44839da2a7908caf8805",
      dynamicTemplateData: {
        post_title: postTitle,
        post_excerpt: postExcerpt,
        post_link: postLink,
      },
    });
  }

  const [response] = await SG.send(emails);

  assert(response.statusCode === 202);
}
