import awsLambdaFastify from "@fastify/aws-lambda";
import { buildServer } from "./server";

const app = buildServer({
  logger: true,
});

const handler = awsLambdaFastify(app);

export { handler };
