import awsLambdaFastify from "@fastify/aws-lambda";
import { buildServer } from "./api/server";

const app = buildServer({
  logger: true,
});

const handler = awsLambdaFastify(app);

export { handler };
