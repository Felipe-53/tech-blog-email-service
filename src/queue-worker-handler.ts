import { DeleteMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import assert from "assert";
import { SQSHandler } from "aws-lambda";
import { z } from "zod";
import { SGMailService } from "./email-service/SGMailService";
import { env } from "./env";
import { sendNewBlogPostEmail } from "./queue-worker/use-cases/sendNewBlogPostEmail";
import { findAllConfirmedRecipients } from "./recipients/use-cases/FindAllConfirmedRecipients";

const postDataSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  link: z.string().url(),
});

export const handler: SQSHandler = async (event, context) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);

    const result = postDataSchema.safeParse(body);

    if (!result.success) {
      throw result.error;
    }

    const postData = result.data;

    const recipients = await findAllConfirmedRecipients.execute();

    const mailService = new SGMailService(env.send_grid_api_key);

    const sentEmails = [];

    for (const recipient of recipients) {
      const email = {
        from: "felipeasbarbosa.dev@gmail.com",
        to: recipient.email.getValue(),
        templateId: "d-9c68fec05f8f44839da2a7908caf8805",
        dynamicTemplateData: {
          post_title: postData.title,
          post_excerpt: postData.excerpt,
          post_link: postData.link,
        },
      };

      const result = await mailService.send(email);

      if (!result.accepted) {
        console.error(`Failed to deliver email`);
        console.error(email);
        console.error(result.info);
        continue;
      }

      sentEmails.push(email);
    }

    console.info(
      `Successfully sent ${sentEmails.length} out of ${recipients.length} confirmed recipients`
    );
    console.info(sentEmails);
  }
};
