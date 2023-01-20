import { FastifyReply, FastifyRequest, FastifySchema } from "fastify";

interface JsonResponse {
  status: number;
  body: object;
}

export abstract class BaseController {
  abstract execute(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<unknown>;

  abstract schema: FastifySchema;

  static jsonResponse(reply: FastifyReply, params: JsonResponse) {
    const { status, body } = params;

    reply.status(status);

    return reply.send(body);
  }

  protected async ok(reply: FastifyReply, body: object) {
    return BaseController.jsonResponse(reply, {
      status: 200,
      body,
    });
  }

  protected async created(reply: FastifyReply, body: object) {
    return BaseController.jsonResponse(reply, {
      status: 201,
      body,
    });
  }

  protected async badRequest(reply: FastifyReply, error: object) {
    return BaseController.jsonResponse(reply, {
      status: 400,
      body: { error },
    });
  }

  protected async conflict(reply: FastifyReply, error: object) {
    return BaseController.jsonResponse(reply, {
      status: 409,
      body: { error },
    });
  }
}
