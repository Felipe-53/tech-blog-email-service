import { SQSHandler } from "aws-lambda";
import { z } from "zod";
import { sendNewBlogPostEmail } from "./use-cases/sendEmail";

const postDataSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  link: z.string(),
});

export const handler: SQSHandler = async (event, context) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);

    const result = postDataSchema.safeParse(body);

    if (!result.success) {
      throw result.error;
    }

    const postData = result.data;

    await sendNewBlogPostEmail({
      postTitle: postData.title,
      postExcerpt: postData.excerpt,
      postLink: postData.link,
    });
  }
};
