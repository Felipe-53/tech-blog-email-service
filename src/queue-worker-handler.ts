import { DeleteMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import assert from "assert";
import { SQSHandler } from "aws-lambda";
import { z } from "zod";
import { env } from "./env";
import { sendNewBlogPostEmail } from "./queue-worker/use-cases/sendNewBlogPostEmail";

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

    const { response, emails } = await sendNewBlogPostEmail({
      postTitle: postData.title,
      postExcerpt: postData.excerpt,
      postLink: postData.link,
    });

    if (response.statusCode !== 202) {
      console.error("Unable to send emails");
      console.log("Failed messages:");
      console.log(emails);
      console.error("API Response");
      console.log(response);
      throw new Error(JSON.stringify(response));
    }

    const sqsClient = new SQSClient({ region: "sa-east-1" });
    const deleteCommand = new DeleteMessageCommand({
      QueueUrl: env.aws_sqs_queue_url,
      ReceiptHandle: record.receiptHandle,
    });

    try {
      const deleteMessageResponse = await sqsClient.send(deleteCommand);
      assert(
        deleteMessageResponse.$metadata.httpStatusCode === 200,
        `Delete Message status code response is not 200\n ${deleteMessageResponse}`
      );
    } catch (err) {
      console.error("Failed to delete processed message");
      console.error(err);
    }

    console.info("Successfully sent emails to the following recipients");
    console.info(emails);
  }
};
