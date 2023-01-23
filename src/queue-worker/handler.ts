import { SQSHandler } from "aws-lambda";

const handler: SQSHandler = async (event, context) => {
  event.Records.forEach((record) => {
    record.body;
  });
};
