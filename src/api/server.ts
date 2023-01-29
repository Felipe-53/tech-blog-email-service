import fastifyCors from "@fastify/cors";
import fastify, { FastifyServerOptions } from "fastify";
import { recipientRoutes } from "./recipientRoutes";
import { BaseController } from "../shared/BaseController";
import { ValidationError } from "../shared/errors";

export function buildServer(opts?: FastifyServerOptions) {
  const app = fastify(opts);

  app.register(fastifyCors, {
    origin: "https://felipebarbosa.dev",
  });

  app.setErrorHandler(async (err, request, reply) => {
    if (err instanceof ValidationError) {
      return BaseController.jsonResponse(reply, {
        status: 400,
        body: { error: err },
      });
    }

    reply.log.error("Error handler");
    reply.log.error(err);

    return BaseController.jsonResponse(reply, {
      status: err.statusCode || 500,
      body: { error: err },
    });
  });

  app.register(recipientRoutes);

  return app;
}
