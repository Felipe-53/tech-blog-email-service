import { FastifyPluginAsync } from "fastify";
import { createRecipientController } from "../use-cases/CreateRecipient/index";

export const recipientRoutes: FastifyPluginAsync = async (app) => {
  app.route({
    url: "/recipient",
    method: "POST",
    handler: createRecipientController.execute.bind(createRecipientController),
    schema: createRecipientController.schema,
  });
};
