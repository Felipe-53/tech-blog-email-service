import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { confirmRecipientController } from "../recipients/use-cases/ConfirmRecipient";
import { createRecipientController } from "../recipients/use-cases/CreateRecipient/index";

export const recipientRoutes: FastifyPluginAsync = async (app) => {
  app.route({
    url: "/recipient",
    method: "POST",
    handler: createRecipientController.execute.bind(createRecipientController),
    schema: createRecipientController.schema,
  });

  app.route({
    url: "/recipient/:id/status",
    method: "PATCH",
    handler: confirmRecipientController.execute.bind(
      confirmRecipientController
    ),
    schema: confirmRecipientController.schema,
  });

  const confirmRecipientSchema = z.object({
    id: z.string().uuid(),
  });

  type ConfirmRecipientSchema = z.infer<typeof confirmRecipientSchema>;

  app.route({
    url: "/confirm-recipient",
    method: "GET",
    handler: (
      req: FastifyRequest<{ Querystring: ConfirmRecipientSchema }>,
      reply
    ) => {
      const recipientId = req.query.id;

      reply.status(301);
      reply.headers({
        location: `https://felipebarbosa.dev/email-subscription?id=${recipientId}`,
      });
    },
    schema: {
      querystring: zodToJsonSchema(confirmRecipientSchema),
    },
  });
};
