import fastify, { FastifyServerOptions } from "fastify";
import { recipientRoutes } from "../recipients/infra/recipientRoutes";
import { BaseController } from "../shared/BaseController";
import { ValidationError } from "../shared/errors";

export function buildServer(opts?: FastifyServerOptions) {
  const app = fastify(opts);

  app.setErrorHandler(async (err, request, reply) => {
    if (err instanceof ValidationError) {
      return BaseController.jsonResponse(reply, {
        status: 400,
        body: { error: err },
      });
    }

    console.log("error handler: ", err);
    return BaseController.jsonResponse(reply, {
      status: err.statusCode || 500,
      body:
        process.env.NODE_ENV === "production"
          ? { error: "Internal Server Error" }
          : { error: err },
    });
  });

  app.register(recipientRoutes);

  return app;
}
